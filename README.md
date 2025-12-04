### FixMyBlock

Built for the 2025 Congressional App Challenge  
Global Unity (GU) – Burbank, CA

“One report on the map is worth a hundred complaints in email.”

> **Note:** This repository contains the **frontend version** of FixMyBlock.  
> To see the **original full-stack version** (frontend + backend) exactly as submitted to the Congressional App Challenge, visit and **download/clone**:  
> 👉 https://github.com/oganes-world/FixMyBlockCA30

⚠️ **Disclaimer:** All environment files and runtime uploads (user images) are intentionally excluded from this repository.

---

## About

**FixMyBlock** is a student-built web app for reporting and visualizing real neighborhood problems on a shared map.

Instead of complaints getting lost in random emails or forms, residents can:

- Drop a pin on the map
- Describe the issue (speeding, trash, graffiti, broken signs, etc.)
- Optionally attach a photo (in the full-stack version)
- Flag safety concerns near schools

Every report becomes a data point that students, community leaders, and local government can actually see and act on.

This repo focuses on the **frontend UI and map experience**.  
The **original submission** with backend logic (APIs, database, image storage) lives in the separate repo:  
https://github.com/oganes-world/FixMyBlockCA30

---

## Live Project

**Live Demo:** 
https://fix-my-block-front.vercel.app/

---

## How It’s Made

### This Repository (Frontend Version)

**Main tech used:**

- React
- TypeScript

This repo provides the **client-side app**:

- Map-based reporting experience
- Report form and school-safety logic
- Reports dashboard and PDF export
- Navigation and layout components

### Original Full-Stack Version (Separate Repo)

The original project submitted to the Congressional App Challenge also includes:

- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Uploads:** Multer for image uploads
- **Infrastructure:** (as configured in that repo)

To inspect or run the **exact version sent to the Congressional App Challenge**, use:  
https://github.com/oganes-world/FixMyBlockCA30

Clone or download that repo if you want the full backend + database setup.

---

## Lessons Learned

- Building a React + TypeScript frontend that talks to a custom API
- Handling geolocation (lat/lng) with an interactive map (React Leaflet)
- Designing a reporting flow that feels simple but collects enough detail
- Keeping the UI readable even with many markers on a map
- Generating PDFs from client-side data using jsPDF
- Splitting a project into a clean **frontend** repo and a **full-stack** repo for clarity

---

## Features (Frontend)

### Reports

- Create new reports by clicking directly on the map  
- Store precise **latitude/longitude** and optional address (via API in the full app)
- Choose from multiple problem types:
  - Speeding
  - Trash / dumping
  - Graffiti / vandalism
  - Broken / missing signs
  - Dangerous crossings
  - Other neighborhood issues
- Add a detailed description
- Optional image upload (supported by the backend in the full-stack repo)

### School Safety

- Extra questions for **speeding** reports:
  - Is this near a school?
  - Which school is affected?
- Simple safety indicator:
  - “Safe” vs “Not Safe” based on speeding reports near each school
- Helps students and administrators quickly see which schools are under the most pressure

### Reports Map & Dashboard

- All reports displayed as markers on an interactive map
- Click any marker to view:
  - Problem type
  - Description
  - Coordinates
  - School/safety info (if relevant)
  - Creation time
- Easy visual scanning for clusters: see where streets and blocks have repeated problems

### PDF Export

- Generate a **PDF summary** for an individual report using jsPDF:
  - Report ID
  - Problem type
  - Location data
  - School safety info
  - Description
  - Timestamp
- PDFs can be shared with:
  - School admins
  - City staff
  - Community meetings

### UI / Design

- Clean, minimal layout focused on:
  - Clear maps
  - Simple forms
  - Easy navigation between pages
- Responsive design for desktop and smaller screens


```text
http://localhost:5000/api
