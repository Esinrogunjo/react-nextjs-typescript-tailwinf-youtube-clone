import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserBody } from "./user.schema";
import { createUser } from "./user.service";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserBody>,

  res: Response
) {
  const { username, email, password } = req.body;

  console.log(req.body);

  try {
    await createUser({ username, email, password });
    return res.status(StatusCodes.CREATED).send("user created successfully ");
    //createUser
  } catch (e) {
    //note error 11000 means a uniqe value has been violated
    if (e.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send("User already exists");
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
