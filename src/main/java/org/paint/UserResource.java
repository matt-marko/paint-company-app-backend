package org.paint;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.TransactionScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/user")
@ApplicationScoped
public class UserResource {

    // Method to initialize users
    @PostConstruct
    void config() {
        initdb();
    }

    @Transactional
    public void initdb() {
        UserEntity user1 = new UserEntity();
        user1.setName("John");
        user1.setPermission("view");

        UserEntity user2 = new UserEntity();
        user2.setName("Jane");
        user2.setPermission("edit");

        UserEntity user3 = new UserEntity();
        user3.setName("Adam");
        user3.setPermission("admin");

        // Persist the users
        UserEntity.persist(user1);
        UserEntity.persist(user2);
        UserEntity.persist(user3);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers() {
        List<UserEntity> users = UserEntity.listAll();
        return Response.ok(users).build();
    }

    @POST
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createUsers(List<UserEntity> users) {
        for (UserEntity user : users) {
            UserEntity.persist(user);
        }

        if(users.stream().allMatch(UserEntity::isPersistent)) {
            return Response.status(Response.Status.CREATED).build();
        }

        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @PUT
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUserPermissions(List<UserEntity> updatedUsers) {
        List<UserEntity> existingUsers = UserEntity.listAll();

        String existingUserName = "";
        String updatedUserName = "";

        for (UserEntity existingUser : existingUsers) {
            for (UserEntity updatedUser : updatedUsers) {
                existingUserName = existingUser.getName().toLowerCase();
                updatedUserName = updatedUser.getName().toLowerCase();

                if (existingUserName.equals(updatedUserName)) {
                    existingUser.setPermission(updatedUser.getPermission());
                    existingUser.persist();
                    break;
                }
            }
        }

        return Response.ok(existingUsers).build();
    }
}
