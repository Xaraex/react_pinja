import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

const ConsultantCard = ({ consultant }) => {
  const { firstName, lastName, skills, education, yearsOfExperience } = consultant;

  // Näytetään vain top 3 taitoa
  const topSkills = skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
          <User className="h-6 w-6 text-slate-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{firstName} {lastName}</h3>
          <p className="text-sm text-slate-500">{education.degree}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Kokemus: {yearsOfExperience} vuotta</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <Badge key={skill.name} variant="secondary">
                {skill.name} ({skill.level}/5)
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultantCard;