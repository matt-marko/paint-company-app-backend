package org.paint;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/user")
@ApplicationScoped
public class UserResource {

    /* Method to initialize users */
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

        UserEntity user4 = new UserEntity();
        user4.setName("Painter");
        user4.setPermission("edit");

        UserEntity.persist(user1);
        UserEntity.persist(user2);
        UserEntity.persist(user3);
        UserEntity.persist(user4);
    }

    /* GET a list of all users */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers() {
        List<UserEntity> users = UserEntity.listAll();
        return Response.ok(users).build();
    }

    /* GET a user specified in the path parameter */
    @GET
    @Path("/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserByUsername(@PathParam("name") String name) {
        UserEntity user = UserEntity.find("name", name).firstResult();
        if (user != null) {
            return Response.ok(user).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("User with username " + name + " not found")
                    .build();
        }
    }

    /* POST a list of users to the database */
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

    /* PATCH the permission of the user specified in the path parameter */
    @PATCH
    @Path("/{name}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response updateUserPermission(String permission, @PathParam("name") String name) {
        UserEntity userToUpdate = UserEntity.find("name", name).firstResult();

        if (userToUpdate == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        userToUpdate.setPermission(permission);

        List<UserEntity> users = UserEntity.listAll();
        return Response.ok(users).build();
    }
}
