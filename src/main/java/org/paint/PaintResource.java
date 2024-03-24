package org.paint;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.net.URI;
import java.util.List;

@Path("/paint")
public class PaintResource {

    /* Method to initialize paints */
    @PostConstruct
    void config() {
        initdb();
    }

    @Transactional
    public void initdb() {
        PaintEntity paint1 = new PaintEntity();
        paint1.setColour("Blue");
        paint1.setStatus("out of stock");

        PaintEntity paint2 = new PaintEntity();
        paint2.setColour("Purple");
        paint2.setStatus("running low");

        PaintEntity paint3 = new PaintEntity();
        paint3.setColour("White");
        paint3.setStatus("running low");

        PaintEntity paint4 = new PaintEntity();
        paint4.setColour("Black");
        paint4.setStatus("available");

        PaintEntity paint5 = new PaintEntity();
        paint5.setColour("Grey");
        paint5.setStatus("available");

        UserEntity.persist(paint1);
        UserEntity.persist(paint2);
        UserEntity.persist(paint3);
        UserEntity.persist(paint4);
        UserEntity.persist(paint5);
    }

    /* GET a list of all paints */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPaints() {
        List<PaintEntity> paints = PaintEntity.listAll();
        return Response.ok(paints).build();
    }

    /* POST a list of paints to the database */
    @POST
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createPaints(List<PaintEntity> paints) {
        for (PaintEntity paint : paints) {
            PaintEntity.persist(paint);
        }

        if(paints.stream().allMatch(PaintEntity::isPersistent)) {
            return Response.status(Response.Status.CREATED).build();
        }

        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    /* PUT an updated list of paints on the database */
    @PUT
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePaints(List<PaintEntity> updatedPaints) {
        List<PaintEntity> existingPaints = PaintEntity.listAll();

        String existingPaintColour = "";
        String updatedPaintColour = "";

        for (PaintEntity existingPaint : existingPaints) {
            for (PaintEntity updatedPaint : updatedPaints) {
                existingPaintColour = existingPaint.getColour().toLowerCase();
                updatedPaintColour = updatedPaint.getColour().toLowerCase();

                if (existingPaintColour.equals(updatedPaintColour)) {
                    existingPaint.setStatus(updatedPaint.getStatus());
                    break;
                }
            }
        }

        return Response.ok(existingPaints).build();
    }
}
