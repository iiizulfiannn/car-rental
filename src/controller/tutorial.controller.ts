import { Request, Response } from "express";
import Tutorial from "../model/tutorial.model";
import tutorialRepository from "../repository/tutorial.repository";

export default class TutorialController {
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    try {
      const tutorial: Tutorial = req.body;
      const savedTutorial = await tutorialRepository.save(tutorial);

      res.status(201).send(savedTutorial);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving tutorials.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    try {
      const tutorials = await tutorialRepository.retrieveAll({ title: title });

      res.status(200).send(tutorials);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving tutorials.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const adminId: number = parseInt(req.params.adminId);

    try {
      const tutorial = await tutorialRepository.retrieveById(adminId);

      if (tutorial) res.status(200).send(tutorial);
      else
        res.status(404).send({
          message: `Cannot find Tutorial with adminId=${adminId}.`,
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Tutorial with adminId=${adminId}.`,
      });
    }
  }

  async update(req: Request, res: Response) {
    let tutorial: Tutorial = req.body;
    tutorial.adminId = parseInt(req.params.adminId);

    try {
      const num = await tutorialRepository.update(tutorial);

      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with adminId=${tutorial.adminId}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Tutorial with adminId=${tutorial.adminId}.`,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const adminId: number = parseInt(req.params.adminId);

    try {
      const num = await tutorialRepository.delete(adminId);

      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with adminId=${adminId}. Maybe Tutorial was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Tutorial with adminId==${adminId}.`,
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await tutorialRepository.deleteAll();

      res.send({ message: `${num} Tutorials were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all tutorials.",
      });
    }
  }

  async findAllPublished(req: Request, res: Response) {
    try {
      const tutorials = await tutorialRepository.retrieveAll({
        published: true,
      });

      res.status(200).send(tutorials);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving tutorials.",
      });
    }
  }
}
