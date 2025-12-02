import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Open-source images (from Unsplash)
const heroImage = "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1600&q=80";
const mapIcon = "https://images.unsplash.com/photo-1598464032157-9b4a87e05f73?auto=format&fit=crop&w=64&q=80";
const reportIcon = "https://images.unsplash.com/photo-1564866657310-1f031b9204a3?auto=format&fit=crop&w=64&q=80";
const statsIcons = [
  "https://images.unsplash.com/photo-1581092580497-5a1f9d4c16d1?auto=format&fit=crop&w=48&q=80",
  "https://images.unsplash.com/photo-1592496001029-3a6ed4d67b0f?auto=format&fit=crop&w=48&q=80",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=48&q=80"
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-80 md:h-[32rem]">
        <img
          src={heroImage}
          alt="Community Action"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            Global Unity / FixMyBlock
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white drop-shadow-md max-w-3xl">
            Making Change, One Block at a Time
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="p-6 max-w-6xl mx-auto space-y-8 mt-8">
        <img className="w-60" src="/logo.jpg" alt="" />
        <div className="bg-card p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">Who We Are</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Global Unity is a student-led club focused on making real, positive changes in our school, city, and county.
            We work with students, teachers, school board members, and local councillors to identify the problems that affect
            our community and take real steps to solve them.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            We start by listening, surveying students and community members to understand what issues matter most. From there,
            we turn those ideas into projects that make a visible difference. One of our earliest successes was the Sign Project,
            where we raised over $1,000 to design and install clear classroom signs around our school. This helped students and
            visitors find their way more easily and improved communication across the campus.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">Our Mission: FixMyBlock</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            FixMyBlock is a community project that helps residents report and track everyday problems around their neighborhood,
            things like broken sidewalks, missing crosswalks, unsafe traffic spots, dark streets, or speeding near schools.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            When someone reports an issue, it appears as a red dot on an interactive map. This lets us and local leaders see
            where problems are happening and start working toward solutions faster. Our goal is simple: to help people take action
            and make their neighborhoods safer and stronger.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Through Global Unity and FixMyBlock, we’re showing how students can lead real civic change, one report, one project,
            and one block at a time.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-center">
          <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img src="/images/requests.png" alt="Reports" className="w-12 h-12 mb-2" />
            <p className="text-3xl font-bold text-primary">100+</p>
            <p className="text-muted-foreground">Reports Submitted</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img src="/images/solving.png" alt="Solved" className="w-12 h-12 mb-2" />
            <p className="text-3xl font-bold text-primary">50+</p>
            <p className="text-muted-foreground">Issues Solved</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img src="/images/monitoring.png" alt="Schools" className="w-12 h-12 mb-2" />
            <p className="text-3xl font-bold text-primary">10+</p>
            <p className="text-muted-foreground">Schools Monitored</p>
          </div>
        </div>

        {/* Action Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/reports")}
            className="border-2 border-border bg-card hover:bg-muted p-12 transition-colors flex flex-col items-center justify-center min-h-[300px] rounded-xl shadow-lg relative overflow-hidden group"
          >
            <img
              src='/images/map.png'
              alt="Map"
              className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform"
            />
            <h2 className="text-2xl font-bold mb-2">Look at the Reports</h2>
            <p className="text-muted-foreground text-center">
              View all problem reports on the interactive map
            </p>
          </button>

          <button
            onClick={() => navigate("/report")}
            className="border-2 border-primary bg-card hover:bg-primary/5 p-12 transition-colors flex flex-col items-center justify-center min-h-[300px] rounded-xl shadow-lg relative overflow-hidden group"
          >
            <img
              src="/images/report.png"
              alt="Report"
              className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform"
            />
            <h2 className="text-2xl font-bold text-primary mb-2">Report the Problem</h2>
            <p className="text-muted-foreground text-center">
              Submit a new problem report
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
