"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const states = [
  { code: "JHR", name: "Johor" },
  { code: "KDH", name: "Kedah" },
  { code: "KTN", name: "Kelantan" },
  { code: "MLK", name: "Melaka" },
  { code: "NSN", name: "Negeri Sembilan" },
  { code: "PHG", name: "Pahang" },
  { code: "PRK", name: "Perak" },
  { code: "PLS", name: "Perlis" },
  { code: "PNG", name: "Pulau Pinang" },
  { code: "SBH", name: "Sabah" },
  { code: "SWK", name: "Sarawak" },
  { code: "SGR", name: "Selangor" },
  { code: "TRG", name: "Terengganu" },
  { code: "KUL", name: "W.P. Kuala Lumpur" },
  { code: "LBN", name: "W.P. Labuan" },
  { code: "PJY", name: "W.P. Putrajaya" }
];

export default function SurveySection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    location: "",
    brandTypes: [] as string[],
    favoriteBrands: "",
    brandReasons: [] as string[],
    loyalty: "",
    stopSupporting: [] as string[],
    influencers: "",
    discoverBrands: [] as string[],
    localTrends: "",
    genZBrand: "",
    outdatedBrand: "",
    loyaltyEmoji: ""
  });

  const handleCheckboxChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(
            (item) => item !== value
          )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    const { data, error } = await supabase.from("brand_survey").insert({
      age: formData.age,
      gender: formData.gender,
      location: formData.location,
      brand_types: formData.brandTypes,
      favorite_brands: formData.favoriteBrands,
      brand_reasons: formData.brandReasons,
      loyalty: formData.loyalty,
      stop_supporting: formData.stopSupporting,
      influencers: formData.influencers,
      discover_brands: formData.discoverBrands,
      local_trends: formData.localTrends,
      gen_z_brand: formData.genZBrand,
      outdated_brand: formData.outdatedBrand,
      loyalty_emoji: formData.loyaltyEmoji
    });
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data);
    }
    setFormData({
      age: "",
      gender: "",
      location: "",
      brandTypes: [],
      favoriteBrands: "",
      brandReasons: [],
      loyalty: "",
      stopSupporting: [],
      influencers: "",
      discoverBrands: [],
      localTrends: "",
      genZBrand: "",
      outdatedBrand: "",
      loyaltyEmoji: ""
    });
    window.location.href = "/thankyou";
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="text-left">
            <CardTitle className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              📱 Tinjauan Kesetiaan Jenama & Pengaruh Gen Z
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-200">
              🧠 Kenapa Anda Setia? Meneroka Kesetiaan Jenama dalam Kalangan Gen
              Z
            </CardDescription>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: About You */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-700 dark:text-slate-100">
                🧍 SEKSYEN 1: Tentang Anda
              </CardTitle>
              <CardDescription>
                Kenali anda dengan lebih mendalam
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label className="text-base font-medium">1. Umur</Label>
                <RadioGroup
                  value={formData.age}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, age: value }))
                  }
                  className="mt-2 grid grid-cols-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="15" id="age-15" />
                    <Label htmlFor="age-15">15 tahun</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="16" id="age-16" />
                    <Label htmlFor="age-16">16 tahun</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="17" id="age-17" />
                    <Label htmlFor="age-17">17 tahun</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="18" id="age-18" />
                    <Label htmlFor="age-18">18 tahun</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="+19" id="age-19" />
                    <Label htmlFor="age-19">+19 tahun</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">2. Jantina</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value }))
                  }
                  className="mt-2 grid grid-cols-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lelaki" id="gender-male" />
                    <Label htmlFor="gender-male">Lelaki</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perempuan" id="gender-female" />
                    <Label htmlFor="gender-female">Perempuan</Label>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2">
                    <RadioGroupItem
                      value="prefer-not-to-say"
                      id="gender-prefer"
                    />
                    <Label htmlFor="gender-prefer">
                      Lebih suka untuk tidak berkongsi
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="location" className="text-base font-medium">
                  3. Negeri Asal
                </Label>
                <div className="grid grid-cols-2 ">
                  {states.map((state, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <Checkbox
                        id={state.code}
                        checked={formData.location === state.code}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            location: checked ? state.code : ""
                          }))
                        }
                      />
                      <Label htmlFor={state.code}>{state.name}</Label>
                    </div>
                  ))}
                </div>
                {/*  <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value
                    }))
                  }
                  placeholder="Jawapan ringkas"
                  className="mt-2"
                /> */}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Brands You Use & Like */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-700 dark:text-slate-100">
                🛍️ SEKSYEN 2: Jenama Yang Anda Guna & Suka
              </CardTitle>
              <CardDescription>
                Kongsi jenama kegemaran anda dan kenapa anda suka.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label className="text-base font-medium">
                  4. Jenis jenama mana yang paling kerap anda beli? (Pilih semua
                  yang berkaitan)
                </Label>
                <div className="mt-2 space-y-2">
                  {[
                    {
                      value: "international",
                      label:
                        "Jenama antarabangsa / MNC (contoh: Nike, Apple, McDonald's)"
                    },
                    {
                      value: "local",
                      label:
                        "Jenama Malaysia / tempatan (contoh: Tealive, MR.DIY, PappaRich)"
                    },
                    {
                      value: "online",
                      label:
                        "Jenama dalam talian sahaja (contoh: Shopee, Zalora, Shein)"
                    },
                    {
                      value: "small-business",
                      label:
                        "Perniagaan kecil / bebas (contoh: Kedai IG / TikTok)"
                    }
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`brand-type-${option.value}`}
                        checked={formData.brandTypes.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "brandTypes",
                            option.value,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`brand-type-${option.value}`}
                        className="text-sm"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="favorite-brands"
                  className="text-base font-medium"
                >
                  5. Namakan 3 jenama kegemaran anda.
                </Label>
                <Input
                  id="favorite-brands"
                  value={formData.favoriteBrands}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      favoriteBrands: e.target.value
                    }))
                  }
                  placeholder="Jawapan ringkas"
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-medium">
                  6. Kenapa anda suka jenama-jenama ini? (Pilih 3 sebab utama)
                </Label>
                <div className="mt-2 space-y-2">
                  {[
                    {
                      value: "value-for-money",
                      label: "Berbaloi dengan harga"
                    },
                    { value: "trendy", label: "Trendy / Bergaya" },
                    { value: "influencer", label: "Disyorkan oleh influencer" },
                    {
                      value: "online-easy",
                      label: "Senang dibeli secara online"
                    },
                    { value: "eco-friendly", label: "Mesra alam / beretika" },
                    {
                      value: "social-media",
                      label: "Kandungan media sosial yang menarik"
                    },
                    {
                      value: "understand-me",
                      label: 'Faham citarasa saya / "vibe" saya'
                    }
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`brand-reason-${option.value}`}
                        checked={formData.brandReasons.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "brandReasons",
                            option.value,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`brand-reason-${option.value}`}
                        className="text-sm"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Loyalty & Behavior */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-700 dark:text-slate-100">
                🔁 SEKSYEN 3: Kesetiaan & Tingkah Laku
              </CardTitle>
              <CardDescription>
                Sejauh mana anda setia dengan jenama?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label className="text-base font-medium">
                  7. Adakah anda akan tukar kepada jenama lain jika ia lebih
                  murah atau berkualiti tinggi?
                </Label>
                <RadioGroup
                  value={formData.loyalty}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, loyalty: value }))
                  }
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-loyal" id="loyalty-not" />
                    <Label htmlFor="loyalty-not">
                      Ya, saya tidak begitu setia
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="depends" id="loyalty-depends" />
                    <Label htmlFor="loyalty-depends">
                      Bergantung kepada sejauh mana saya suka jenama itu
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="loyal" id="loyalty-loyal" />
                    <Label htmlFor="loyalty-loyal">
                      Tidak, saya tetap setia dengan jenama kegemaran
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">
                  8. Apa yang boleh buat anda berhenti sokong atau unfollow
                  sesebuah jenama? (Pilih semua yang berkaitan)
                </Label>
                <div className="mt-2 space-y-2">
                  {[
                    {
                      value: "bad-service",
                      label: "Layanan pelanggan yang teruk"
                    },
                    {
                      value: "not-support-issues",
                      label: "Tidak menyokong isu yang saya peduli"
                    },
                    {
                      value: "controversy",
                      label: 'Terlibat dalam kontroversi / "cancelled"'
                    },
                    {
                      value: "boring",
                      label: "Bosan atau tidak aktif di media sosial"
                    },
                    {
                      value: "friends-stop",
                      label: "Kawan-kawan berhenti guna"
                    }
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`stop-supporting-${option.value}`}
                        checked={formData.stopSupporting.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "stopSupporting",
                            option.value,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`stop-supporting-${option.value}`}
                        className="text-sm"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Influencer & Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-700 dark:text-slate-100">
                📸 SEKSYEN 4: Influencer & Trend
              </CardTitle>
              <CardDescription>
                {`Siapa dan apa yang tengah 'in' bagi anda?`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label htmlFor="influencers" className="text-base font-medium">
                  9. Siapakah 2 influencer atau pencipta kandungan kegemaran
                  anda (tempatan atau antarabangsa)?
                </Label>
                <Input
                  id="influencers"
                  value={formData.influencers}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      influencers: e.target.value
                    }))
                  }
                  placeholder="Jawapan ringkas"
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-medium">
                  10. Di mana anda biasa jumpa jenama atau produk baru? (Pilih 2
                  utama)
                </Label>
                <div className="mt-2 space-y-2 grid grid-cols-2 gap-x-4">
                  {[
                    { value: "tiktok", label: "TikTok" },
                    { value: "instagram", label: "Instagram" },
                    { value: "youtube", label: "YouTube" },
                    { value: "shopee-lazada", label: "Shopee / Lazada" },
                    { value: "friends", label: "Kawan atau rakan sekolah" },
                    {
                      value: "influencer-collab",
                      label: "Kolaborasi dengan influencer"
                    },
                    { value: "livestream", label: "Live stream / Unboxing" }
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`discover-${option.value}`}
                        checked={formData.discoverBrands.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "discoverBrands",
                            option.value,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`discover-${option.value}`}
                        className="text-sm"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="local-trends" className="text-base font-medium">
                  11. Apakah trend atau jenama tempatan yang hanya orang
                  Malaysia akan faham dan anda tengah minat sekarang?
                </Label>
                <Textarea
                  id="local-trends"
                  value={formData.localTrends}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      localTrends: e.target.value
                    }))
                  }
                  placeholder="Jawapan terbuka – taip sendiri"
                  className="mt-2 bg-slate-200 dark:bg-slate-200"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Quick & Brief */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-700 dark:text-slate-100">
                ⭐ SEKSYEN 5: Pantas & Ringkas
              </CardTitle>
              <CardDescription>Jawapan 1 perkataan atau emoji!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="genz-brand" className="text-base font-medium">
                  12. Satu jenama yang faham Gen Z?
                </Label>
                <Input
                  id="genz-brand"
                  value={formData.genZBrand}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      genZBrand: e.target.value
                    }))
                  }
                  placeholder="Jawapan ringkas"
                  className="mt-2"
                />
              </div>

              <div>
                <Label
                  htmlFor="outdated-brand"
                  className="text-base font-medium"
                >
                  {`13. Satu jenama yang anda rasa "ketinggalan zaman"?`}
                </Label>
                <Input
                  id="outdated-brand"
                  value={formData.outdatedBrand}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      outdatedBrand: e.target.value
                    }))
                  }
                  placeholder="Jawapan ringkas"
                  className="mt-2"
                />
              </div>

              <div>
                <Label
                  htmlFor="loyalty-emoji"
                  className="text-base font-medium"
                >
                  14. Guna 1 emoji untuk tunjuk macam mana sesebuah jenama boleh
                  buat anda setia.
                </Label>
                <Input
                  id="loyalty-emoji"
                  value={formData.loyaltyEmoji}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      loyaltyEmoji: e.target.value
                    }))
                  }
                  placeholder="Emoji sahaja"
                  className="mt-2"
                  maxLength={2}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pb-8">
            <Button
              type="submit"
              size="lg"
              className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 text-lg"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Loading..." : "Hantar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
