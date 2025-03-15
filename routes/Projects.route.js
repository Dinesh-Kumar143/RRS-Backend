import express from "express"
import { Project } from "../model/Project.model.js"
import cors from "cors"
const router = express.Router();
router.use(cors({ origin: "https://iad-rrs-website.vercel.app/" }))

router.post("/", async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ error: "Project name is required!" })
        }
        const project = await Project.create(req.body);
        console.log(`${project} posted`)
        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/", async (req, res) => {
    try {
        const project = await Project.find({});
        if (!project) {
            return res.status(404).json({ message: "Projects Not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project Not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findByIdAndUpdate(id, req.body);
        if (!project) {
            return res.status(404).json({ message: "Project Not found" });
        }

        const updatedProject = await Project.findById(id);

        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: "Project Not found" });
        }

        res.status(200).json({ message: "Project Deleted Successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete("/", async (req, res) => {
    try {
        const project = await Project.deleteMany({});
        if (!project) {
            return res.status(404).json({ message: "Project Not found" });
        }

        res.status(200).json({ message: "Projects Deleted Successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})




export default router;