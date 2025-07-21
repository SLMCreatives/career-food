import SurveySection from "@/components/survey";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Survey() {
  return (
    <div className="flex flex-col p-0 -mt-20">
      <div className="absolute top-3 right-2 z-50 bg-slate-200 dark:bg-slate-800">
        <ThemeSwitcher />
      </div>
      {/* <ThemeSwitcher /> */}
      <SurveySection />
    </div>
  );
}
