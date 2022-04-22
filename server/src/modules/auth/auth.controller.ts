import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import omit from "../../helpers/Omit";
import { findUserByEmail } from "../user/user.service";
import { signJwt } from "./auth.utils";

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  //find the user by email
  const user = await findUserByEmail(email);
  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid Email or Password");
  }

  const payload = omit(user.toJSON(), ["password", "__v"]);

  const jwt = signJwt(payload);

  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10,
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });
  return res.status(StatusCodes.OK).send(jwt);
}
