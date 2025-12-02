import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReports, Report } from "@/lib/reportStore";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jsPDF } from "jspdf";
import SimpleMap, { SimpleMarker } from "@/components/SimpleMap";

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 40.7128, lng: -74.006 });

  // Fetch reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        // Map Mongo _id to id for frontend usage
        const mapped = data.map((r) => ({
          ...r,
          timestamp: r.timestamp ? new Date(r.timestamp) : new Date(),
        }));
        console.log(mapped);
        setReports(mapped);

      } catch (err) {
        console.error("❌ Failed to fetch reports:", err);
      }
    };
    fetchReports();
  }, []);

  const generatePDF = (report: Report & { id?: string }) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("FixMyBlock Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Report ID: ${report.id}`, 20, 35);
    doc.text(`Problem Type: ${report.problemType}`, 20, 45);

    if (report.isNearSchool !== undefined) {
      doc.text(`Near School: ${report.isNearSchool ? "Yes" : "No"}`, 20, 55);
      if (report.schoolName) {
        doc.text(`School Name: ${report.schoolName}`, 20, 65);
      }
    }

    doc.text(
      `Location: ${report.location?.lat.toFixed(6)}, ${report.location?.lng.toFixed(6)}`,
      20,
      75
    );

    doc.text(`Description:`, 20, 85);

    const splitDescription = doc.splitTextToSize(report.description || "No description provided", 170);
    doc.text(splitDescription, 20, 95);

    if (report.timestamp) doc.text(`Date: ${report.timestamp.toLocaleString()}`, 20, 115);

    doc.save(`report-${report.id}.pdf`);
  };

  const handleReportClick = (report: Report) => {
    if (!report.location?.lat || !report.location?.lng) return;
    setSelectedReportId(report._id || null);
    setCenter({ lat: report.location.lat, lng: report.location.lng });
  };


  // School safety
  const checkSchoolSafety = (school: string) => {
    return reports.filter(
      (r) => r.problemType === "speeding" && r.isNearSchool && r.schoolName === school
    ).length;
  };

  const schoolSafetyCount = selectedSchool ? checkSchoolSafety(selectedSchool) : 0;
  const isSafe = schoolSafetyCount === 0;

  const markers: SimpleMarker[] = reports
    .filter((r) => r.location?.lat !== undefined && r.location?.lng !== undefined)
    .map((r) => ({
      id: r._id || "",
      lat: r.location!.lat,
      lng: r.location!.lng,
      color: "red",
      label: r.problemType,
    }));



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h1 className="text-2xl font-bold">Global Unity / FixMyBlock</h1>
        <Button variant="ghost" onClick={() => navigate("/")} className="mt-2">
          ← Back to Home
        </Button>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-6">Look at the Reports</h2>

        {/* Map Section */}
        <div className="border border-border bg-card mb-6">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold">Reports Map</h3>
            <p className="text-sm text-muted-foreground">
              Red dots show problem locations. Click a dot to see details.
            </p>
          </div>
          <div className="h-[500px]">
            <SimpleMap
              center={center}
              zoom={13}
              markers={markers}
              onMarkerClick={(id) => {
                const r = reports.find((rr) => rr._id === id);
                if (r) handleReportClick(r);
              }}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Reports List */}
        <div className="border border-border bg-card mb-6">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold">People's Reports</h3>
          </div>
          <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
            {reports.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No reports yet. Be the first to report a problem!
              </p>
            ) : (
              reports.map((report) => (
                <div
                  key={report._id}
                  className={`border border-border p-4 cursor-pointer hover:bg-muted transition-colors ${selectedReportId === report._id ? "bg-muted" : ""
                    }`}
                  onClick={() => handleReportClick(report)}
                >
                  <div className="flex gap-4">
                    {report.imageUrl && (
                      <img
                        src={report.imageUrl}
                        alt="Report"
                        className="w-20 h-20 object-cover border border-border"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-center font-bold text-sm">
                        <h2>{report.problemType}</h2>
                        {report.timestamp && (
                          <span className="text-xs text-muted-foreground mt-2">
                            {report.timestamp.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {report.description || "No description"}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      generatePDF(report);
                    }}
                    className="mt-4"
                  >
                    Download PDF
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* School Safety Section */}
        <div className="border border-border bg-card">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-lg">Speeding Near School Safety Check</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Select a school to check if there are speeding reports nearby
            </p>
          </div>
          <div className="p-6 space-y-4 max-w-2xl">
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose a school</label>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a school" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lincoln Elementary">Lincoln Elementary</SelectItem>
                  <SelectItem value="Washington High">Washington High</SelectItem>
                  <SelectItem value="Roosevelt Middle">Roosevelt Middle</SelectItem>
                  <SelectItem value="Jefferson Academy">Jefferson Academy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedSchool && (
              <div className={`border-2 p-4 ${isSafe ? "border-green-500" : "border-red-500"}`}>
                <p className="font-bold text-lg">{isSafe ? "✓ Safe" : "⚠ Not Safe"}</p>
                <p className="text-sm mt-2">
                  {schoolSafetyCount === 0
                    ? "No speeding reports near this school."
                    : `${schoolSafetyCount} speeding report(s) near this school.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
