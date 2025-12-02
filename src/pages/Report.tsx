import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReport } from "@/lib/reportStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ClickableMap = ({
  position,
  setPosition,
  center,
}: {
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
  center: [number, number];
}) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const Report = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [problemType, setProblemType] = useState<string>("");
  const [isNearSchool, setIsNearSchool] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!position) return alert("Please select a location on the map");
    if (!problemType) return alert("Please select a problem type");

    try {
      const report = {
        lat: position[0],
        lng: position[1],
        problemType,
        isNearSchool: problemType === "speeding" ? isNearSchool === "yes" : undefined,
        schoolName: problemType === "speeding" && isNearSchool === "yes" ? schoolName : undefined,
        description,
      };
      console.log(report);
      
      
      await addReport(report, imageFile || undefined);
      alert("✅ Report successfully submitted!");
      // navigate("/reports");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit report");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border p-4">
        <h1 className="text-2xl font-bold">Global Unity / FixMyBlock</h1>
        <Button variant="ghost" onClick={() => navigate("/")} className="mt-2">
          ← Back to Home
        </Button>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-6">Report the Problem</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="border border-border bg-card p-4">
            <h3 className="font-bold mb-2">Select Location on Map</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Click on the map to mark the problem location
            </p>
            <MapContainer
              center={[40.7128, -74.006]}
              zoom={13}
              style={{ width: "100%", height: "450px", borderRadius: "8px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ClickableMap position={position} setPosition={setPosition} center={[40.7128, -74.006]} />
            </MapContainer>
          </div>

          {/* Form Section */}
          <div className="border border-border bg-card p-6 space-y-6">
            <div className="space-y-2">
              <Label>What kind of problem is it?</Label>
              <Select value={problemType} onValueChange={setProblemType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select problem type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="speeding">Speeding</SelectItem>
                  <SelectItem value="graffiti">Graffiti</SelectItem>
                  <SelectItem value="abandoned-vehicle">Abandoned Vehicle</SelectItem>
                  <SelectItem value="tree-issue">Tree Issue</SelectItem>
                  <SelectItem value="parking-violation">Parking Violation</SelectItem>
                  <SelectItem value="water-leak">Water Leak</SelectItem>
                  <SelectItem value="dead-animal">Dead Animal</SelectItem>
                  <SelectItem value="broken-sign">Broken Sign</SelectItem>
                  <SelectItem value="traffic-signal">Traffic Signal Issue</SelectItem>
                  <SelectItem value="noise">Noise</SelectItem>
                  <SelectItem value="trash">Trash/Illegal Dumping</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {problemType === "speeding" && (
              <>
                <div className="space-y-2">
                  <Label>Is it near a school?</Label>
                  <Select value={isNearSchool} onValueChange={setIsNearSchool}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select yes or no" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isNearSchool === "yes" && (
                  <div className="space-y-2">
                    <Label>Select the school</Label>
                    <Select value={schoolName} onValueChange={setSchoolName}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a school" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lincoln Elementary">Lincoln Elementary</SelectItem>
                        <SelectItem value="Washington High">Washington High</SelectItem>
                        <SelectItem value="Roosevelt Middle">Roosevelt Middle</SelectItem>
                        <SelectItem value="Jefferson Academy">Jefferson Academy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            <div className="space-y-2">
              <Label>Add a picture</Label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 max-h-32 border border-border" />
              )}
            </div>

            <div className="space-y-2">
              <Label>Extra description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the problem..."
                rows={4}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Submit Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
