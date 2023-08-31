import { Request, Response } from "express";
import adminRepository from "../repository/admin.repository";
import Admin from "../model/admin.model";

export default class AdminController {
  async create(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    try {
      const admin: Admin = req.body;
      const alreadyEmail = await adminRepository.retrieveAll({
        email: admin.email,
      });
      if (alreadyEmail.length) {
        res.status(409).send({
          message: "Email is already exist!",
        });
        return;
      }
      const savedAdmin = await adminRepository.save(admin);

      res.status(201).send(savedAdmin);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while create admin.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const email = typeof req.query.email === "string" ? req.query.email : "";

    try {
      const admin = await adminRepository.retrieveAll({ email });

      if (!admin.length) {
        res.status(404).send({
          message: "Admin is empty!",
        });
        return;
      }

      res.status(200).send(admin);
    } catch (err) {
      console.log("\nfindAll ", JSON.stringify(err));
      res.status(500).send({
        message: "Some error occurred while retrieving admin.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const adminId: number = parseInt(req.params.adminId);

    try {
      const admin = await adminRepository.retrieveById(adminId);

      if (admin) res.status(200).send(admin);
      else
        res.status(404).send({
          message: `Cannot find Admin with admin adminId=${adminId}.`,
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Admin with admin adminId=${adminId}.`,
      });
    }
  }

  async update(req: Request, res: Response) {
    let admin: Admin = req.body;
    admin.adminId = parseInt(req.params.adminId);

    try {
      const num = await adminRepository.update(admin);

      if (num == 1) {
        res.send({
          message: "Admin was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Admin with adminId=${admin.adminId}. Maybe Admin was not found or req.body is empty!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Admin with adminId=${admin.adminId}.`,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const adminId: number = parseInt(req.params.adminId);

    try {
      const num = await adminRepository.delete(adminId);

      if (num == 1) {
        res.send({
          message: "Admin was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Admin with adminId=${adminId}. Maybe Admin was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Admin with adminId==${adminId}.`,
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await adminRepository.deleteAll();

      res.send({ message: `${num} Admin were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all admin.",
      });
    }
  }
}
