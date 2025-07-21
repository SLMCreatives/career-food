"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Sparkles, GraduationCap } from "lucide-react";
import Link from "next/link";

export function ThankYouSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Thank You Card */}
        <Card className="mb-8 text-center border-2 border-orange-200">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-4xl font-bold text-gray-800 mb-2">
              Terima Kasih! 🎉
            </CardTitle>
            <p className="text-xl text-gray-600">
              Jawapan anda telah berjaya dihantar dan sangat dihargai!
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 mb-6">
              Maklumat yang anda kongsi akan membantu kami memahami trend
              kesetiaan jenama dalam kalangan Gen Z di Malaysia.
            </p>
            <div className="bg-gradient-to-r from-orange-100 to-blue-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                `Suara anda penting dalam membentuk masa depan jenama tempatan
                dan antarabangsa`
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Personality Quiz CTA */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-3">
                <Sparkles className="w-12 h-12 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-purple-800">
                Kuiz Personaliti Gen Z! ✨
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-6">
                Jom discover personaliti jenama anda! Kuiz yang fun dan
                interactive untuk tahu lebih lanjut tentang diri anda.
              </p>
              <div className="bg-white p-3 rounded-lg mb-4 border border-purple-200">
                <p className="text-sm text-purple-700 font-medium">
                  🎯 Hanya 2 minit • 🎨 Interactive • 🏆 Hasil instant
                </p>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-lg">
                <Link href="/">Mula Kuiz Sekarang! 🎮</Link>
              </Button>
            </CardContent>
          </Card>

          {/* UNITAR CTA */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-blue-50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-3">
                <GraduationCap className="w-12 h-12 text-orange-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-blue-800">
                #ACCELERATEYourFuture 🚀
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-4">
                Sertai UNITAR dan jadi sebahagian daripada 98% graduan yang
                berjaya mendapat pekerjaan!
              </p>
              <div className="bg-white p-3 rounded-lg mb-4 border border-orange-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-orange-600">
                    98%
                  </span>
                  <span className="text-sm text-gray-600">
                    Graduate Employability
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {`Employers' Choice of University`}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                <div>• Business & Entrepreneurship</div>
                <div>• Information Technology</div>
                <div>• Art & Design</div>
                <div>• Psychology</div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
                onClick={() => {
                  window.open("https://unitar.my", "_blank");
                }}
              >
                Explore UNITAR 🎓
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
          <CardContent className="text-center py-6">
            <p className="text-gray-600 mb-2">
              Ada soalan atau feedback? Jangan segan untuk hubungi kami!
            </p>
            <p className="text-sm text-gray-500">
              Kajian ini dijalankan untuk tujuan akademik dan penyelidikan
              pasaran.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
