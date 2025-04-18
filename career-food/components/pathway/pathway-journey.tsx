"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, RefreshCw } from "lucide-react";

export default function PathwayJourney() {
  const [spmCredits, setSpmCredits] = useState<number[]>([0]);
  const [showSection2, setShowSection2] = useState(false);
  const [selectedField, setSelectedField] = useState<string>("");
  const [showSection3, setShowSection3] = useState(false);
  const [isOnlineLearning, setIsOnlineLearning] = useState(false);
  const [showSection4, setShowSection4] = useState(false);
  const [educationLevel, setEducationLevel] = useState<number[]>([0]);
  const [showResults, setShowResults] = useState(false);

  const educationLevels = [
    "Sijil (Certificate)",
    "Asasi (Foundation)",
    "Diploma",
    "Ijazah Sarjana Muda (Bachelor)",
    "Sarjana (Masters)",
    "Kedoktoran (Doctorate)"
  ];

  const handleSpmCreditsChange = (value: number[]) => {
    setSpmCredits(value);
  };

  const handleEducationLevelChange = (value: number[]) => {
    setEducationLevel(value);
  };

  return (
    <div className="space-y-8 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {/* Section 1: SPM Credits */}
      <Card className="border rounded-xl shadow-md overflow-hidden transition-all duration-300">
        <CardContent className="p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                📝
              </span>
              S1: Berapakah jumlah kredit SPM anda?
            </h2>
            <div className="pt-4 pb-8 px-2">
              <Slider
                defaultValue={[0]}
                max={10}
                step={1}
                value={spmCredits}
                onValueChange={handleSpmCreditsChange}
                className="my-6"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600">0 Kredit</span>
                <span className="text-sm text-gray-600">10 Kredit</span>
              </div>
              <p className="text-center text-2xl font-bold mt-4">
                {spmCredits[0]} Kredit
              </p>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Untuk menentukan kelayakan ke Certificate, Foundation, Diploma
                atau Bachelor.
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowSection2(true)}
                className="bg-black text-white hover:bg-gray-800"
              >
                Seterusnya <ChevronDown className="ml-2 h-4 w-4 rotate-270" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Field of Interest */}
      {showSection2 && (
        <Card className="border rounded-xl shadow-md overflow-hidden transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  🎯
                </span>
                S2: Apakah bidang yang paling anda minati?
              </h2>
              <div className="pt-4 pb-4">
                <RadioGroup
                  value={selectedField}
                  onValueChange={setSelectedField}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {[
                    "Perniagaan & Pengurusan",
                    "Pendidikan Awal Kanak-Kanak",
                    "Psikologi",
                    "Seni & Reka Bentuk",
                    "E-Setiausaha",
                    "IT / Digital",
                    "Tidak Pasti"
                  ].map((field) => (
                    <div key={field} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={field}
                        id={field.replace(/\s+/g, "-").toLowerCase()}
                      />
                      <Label
                        htmlFor={field.replace(/\s+/g, "-").toLowerCase()}
                        className="border rounded-lg p-3 w-full cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        {field}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowSection3(true)}
                  disabled={!selectedField}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Seterusnya <ChevronDown className="ml-2 h-4 w-4 rotate-270" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section 3: Learning Mode */}
      {showSection3 && (
        <Card className="border rounded-xl shadow-md overflow-hidden transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  🖥️
                </span>
                S3: Apakah mod pembelajaran yang anda gemari?
              </h2>
              <div className="pt-4 pb-4 flex flex-col items-center">
                <div className="flex items-center justify-between w-full max-w-md p-4 border rounded-lg">
                  <span
                    className={`text-lg ${!isOnlineLearning ? "font-semibold" : ""}`}
                  >
                    Kelas Fizikal
                  </span>
                  <Switch
                    checked={isOnlineLearning}
                    onCheckedChange={setIsOnlineLearning}
                  />
                  <span
                    className={`text-lg ${isOnlineLearning ? "font-semibold" : ""}`}
                  >
                    Dalam Talian
                  </span>
                </div>
                <p className="text-center mt-4 text-gray-600">
                  {isOnlineLearning
                    ? "Anda memilih pembelajaran dalam talian (online)"
                    : "Anda memilih kelas fizikal"}
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowSection4(true)}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Seterusnya <ChevronDown className="ml-2 h-4 w-4 rotate-270" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section 4: Education Level */}
      {showSection4 && (
        <Card className="border rounded-xl shadow-md overflow-hidden transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  🎓
                </span>
                S4: Sejauh mana anda bercadang untuk melanjutkan pelajaran?
              </h2>
              <div className="pt-4 pb-8 px-2">
                <p className="mb-2 font-medium">Matlamat Pengajian Anda</p>
                <Slider
                  defaultValue={[0]}
                  max={5}
                  step={1}
                  value={educationLevel}
                  onValueChange={handleEducationLevelChange}
                  className="my-6"
                />
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  {educationLevels.map((level, index) => (
                    <span
                      key={index}
                      className={`${index === educationLevel[0] ? "font-bold text-black" : ""}`}
                    >
                      {index === 0 || index === 5 ? level : ""}
                    </span>
                  ))}
                </div>
                <p className="text-center text-2xl font-bold mt-6">
                  {educationLevels[educationLevel[0]]}
                </p>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Sesuaikan cadangan berdasarkan matlamat jangka panjang
                  pelajar.
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowResults(true)}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Lihat Hasil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {showResults && (
        <Card className="border rounded-xl shadow-md overflow-hidden transition-all duration-300 bg-black text-white lg:col-span-2">
          <CardContent className="p-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Hasil Penilaian Anda</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium">Kredit SPM:</h3>
                  <p className="text-lg">{spmCredits[0]} Kredit</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium">Bidang Minat:</h3>
                  <p className="text-lg">{selectedField}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium">Mod Pembelajaran:</h3>
                  <p className="text-lg">
                    {isOnlineLearning
                      ? "Pembelajaran Dalam Talian"
                      : "Kelas Fizikal"}
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium">Matlamat Pengajian:</h3>
                  <p className="text-lg">
                    {educationLevels[educationLevel[0]]}
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <p className="font-medium">Cadangan Laluan Pengajian:</p>
                <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                  {spmCredits[0] < 1 ? (
                    <div className="flex flex-col gap-4">
                      <p className="text-lg">
                        Sijil (Certificate) - Laluan terbaik untuk anda
                        memulakan pengajian
                      </p>
                      <Button
                        variant={"secondary"}
                        onClick={() =>
                          window.open(
                            "https://www.unitar.my/program-akademik/kolej/",
                            "_blank"
                          )
                        }
                        className="flex text-wrap h-fit mt-2"
                      >
                        Pilihan Program Sijil {selectedField}
                      </Button>
                    </div>
                  ) : spmCredits[0] < 3 ? (
                    <div className="flex flex-col gap-4">
                      <p className="text-lg">
                        Asasi (Foundation) - Laluan yang sesuai untuk anda
                      </p>
                      <Button
                        variant={"secondary"}
                        onClick={() =>
                          window.open(
                            "https://www.unitar.my/program-akademik/sarjana/program-asasi/",
                            "_blank"
                          )
                        }
                        className="flex text-wrap h-fit mt-2"
                      >
                        Pilihan Program Asasi {selectedField}
                      </Button>
                    </div>
                  ) : spmCredits[0] < 5 ? (
                    <div className="flex flex-col gap-4">
                      <p className="text-lg">
                        Diploma - Laluan yang disyorkan berdasarkan kelayakan
                        anda
                      </p>
                      <Button
                        variant={"secondary"}
                        onClick={() =>
                          window.open(
                            "https://www.unitar.my/program-akademik/sarjana/diploma/",
                            "_blank"
                          )
                        }
                        className="flex text-wrap h-fit mt-2"
                      >
                        Pilihan Program Diploma {selectedField}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <p className="text-lg">
                        Ijazah Sarjana Muda (Bachelor) - Anda layak untuk terus
                        ke peringkat ijazah
                      </p>
                      <Button
                        variant={"secondary"}
                        onClick={() =>
                          window.open(
                            "https://www.unitar.my/program-akademik/sarjana/ijazah-sarjana-muda/",
                            "_blank"
                          )
                        }
                        className="flex text-wrap h-fit mt-2"
                      >
                        Pilihan Program Ijazah Muda {selectedField}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <Button
                onClick={() => {
                  setSpmCredits([0]);
                  setSelectedField("");
                  setIsOnlineLearning(false);
                  setEducationLevel([0]);
                  setShowSection2(false);
                  setShowSection3(false);
                  setShowSection4(false);
                  setShowResults(false);
                }}
                variant="ghost"
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Mula Semula
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
