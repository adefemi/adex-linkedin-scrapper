import express from "express";
import LinkedInScrapper from "./scrapper";
import multer from "multer";

const app = express();

const upload = multer();

app.use(upload.none());

app.post("/api", async (req, res) => {
  const { cookie, profileLink } = req.body;
  if(!cookie || !profileLink) {
    return res.status(400).json({ error: "Missing cookie or profile link" });
  }
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const scrapper = new LinkedInScrapper(cookie, profileLink);
  try {
    const [basicInfo, experiences, educations, skills] = await Promise.all([
      scrapper.getProfileInfo(),
      scrapper.getExperiences(),
      scrapper.getEducations(),
      scrapper.getSkills(),
    ]);
    res.json({
      basicInfo,
      experiences,
      educations,
      skills,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
