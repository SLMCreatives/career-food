"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  GraduationCap,
  Users,
  FileText,
  BookOpen,
  Trophy,
  Laptop,
  Search,
  Bell,
  Grid3X3,
  Share2,
  Award,
  Monitor,
  Building,
  Star,
  Clock,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./ui/accordion";

const applicationCategories = [
  {
    id: "academic",
    title: "Academic Services",
    description: "Course management, exams, and academic resources",
    icon: GraduationCap,
    color: "from-blue-500 to-purple-600",
    applications: [
      {
        name: "UNIEC Campus",
        description:
          "Access campus-wide learning management system and course materials",
        icon: GraduationCap,
        color: "bg-gradient-to-br from-purple-500 to-purple-600",
        href: "#",
        image: "/placeholder.svg?height=120&width=200",
        popular: true
      },
      {
        name: "UNIEC College",
        description:
          "College-specific academic portal for course registration and grades",
        icon: Building,
        color: "bg-gradient-to-br from-purple-600 to-indigo-600",
        href: "#",
        image: "/placeholder.svg?height=120&width=200"
      },
      {
        name: "UNIEC Virtual Exam",
        description:
          "Online examination platform for remote and on-campus testing",
        icon: Monitor,
        color: "bg-gradient-to-br from-pink-500 to-rose-500",
        href: "#",
        image: "/placeholder.svg?height=120&width=200",
        popular: true
      },
      {
        name: "E-tree CMS",
        description:
          "Content management system for academic resources and materials",
        icon: BookOpen,
        color: "bg-gradient-to-br from-green-500 to-emerald-600",
        href: "#",
        image: "/placeholder.svg?height=120&width=200"
      },
      {
        name: "CN Platform",
        description:
          "Collaborative platform for course discussions and networking",
        icon: Share2,
        color: "bg-gradient-to-br from-red-500 to-pink-500",
        href: "#",
        image: "/placeholder.svg?height=120&width=200"
      }
    ]
  },
  {
    id: "administrative",
    title: "Administrative Services",
    description: "HR, facilities, and administrative management",
    icon: Users,
    color: "from-green-500 to-teal-600",
    applications: [
      {
        name: "HRMS",
        description:
          "Human Resource Management System for staff and student records",
        icon: Users,
        color: "bg-gradient-to-br from-slate-600 to-slate-700",
        href: "#",
        image: "/placeholder.svg?height=120&width=200"
      },
      {
        name: "Facilities",
        description:
          "Book and manage university facilities, rooms, and equipment",
        icon: Building2,
        color: "bg-gradient-to-br from-teal-500 to-cyan-600",
        href: "#",
        image: "/placeholder.svg?height=120&width=200",
        popular: true
      },
      {
        name: "One Stop Centre",
        description:
          "Centralized service center for student inquiries and support",
        icon: Grid3X3,
        color: "bg-gradient-to-br from-teal-600 to-blue-600",
        href: "#",
        image: "/placeholder.svg?height=120&width=200"
      }
    ]
  },
  {
    id: "learning",
    title: "Learning & Development",
    description: "Professional development and certification programs",
    icon: Trophy,
    color: "from-orange-500 to-red-600",
    applications: [
      {
        name: "UNIEC MCP",
        description:
          "Microsoft Certified Professional training and certification program",
        icon: Award,
        color: "bg-gradient-to-br from-orange-500 to-amber-600",
        href: "#",
        image: "/placeholder.svg?height=120&width=200"
      },
      {
        name: "UNITAR Passport Programme",
        description:
          "Comprehensive skill development and certification pathway",
        icon: FileText,
        color: "bg-gradient-to-br from-yellow-500 to-orange-500",
        href: "#",
        image: "/placeholder.svg?height=120&width=200",
        popular: true
      },
      {
        name: "Centre for Academic Excellence",
        description:
          "Resources and support for academic achievement and research",
        icon: Trophy,
        color: "bg-gradient-to-br from-amber-600 to-orange-600",
        href: "#",
        image: "/placeholder.svg?height=120&width=200"
      }
    ]
  },
  {
    id: "technology",
    title: "Technology & Tools",
    description: "Digital tools and IT services",
    icon: Laptop,
    color: "from-blue-500 to-indigo-600",
    applications: [
      {
        name: "Office 365",
        description:
          "Microsoft Office suite with email, documents, and collaboration tools",
        icon: Laptop,
        color: "bg-gradient-to-br from-blue-500 to-indigo-600",
        href: "#",
        image: "/placeholder.svg?height=120&width=200",
        popular: true
      },
      {
        name: "TQM Sharepoint",
        description:
          "Total Quality Management document sharing and collaboration platform",
        icon: Share2,
        color: "bg-gradient-to-br from-slate-600 to-slate-700",
        href: "#",
        image: "/placeholder.svg?height=120&width=200"
      }
    ]
  }
];

const recentApps = [
  { name: "UNIEC Campus", icon: GraduationCap, lastUsed: "2 hours ago" },
  { name: "Office 365", icon: Laptop, lastUsed: "5 hours ago" },
  { name: "Facilities", icon: Building2, lastUsed: "1 day ago" }
];

const quickStats = [
  { label: "Active Courses", value: "6", change: "+2 from last semester" },
  { label: "Pending Tasks", value: "12", change: "3 due this week" },
  { label: "GPA", value: "3.85", change: "+0.15 from last semester" }
];

export function ModernStudentDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("academic");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredApps =
    applicationCategories
      .find((cat) => cat.id === selectedCategory)
      ?.applications.filter(
        (app) =>
          app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

  const handleSidebarClick = (id: string) => {
    setSidebarOpen(!sidebarOpen);
    setSelectedCategory(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">UNITAR</h1>
                <p className="text-sm text-gray-500">Student Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-gray-900">Sulaiman Shafiq</h2>
              <p className="text-sm text-gray-500">Computer Science</p>
              <Badge variant="secondary" className="text-xs mt-1">
                Year 3
              </Badge>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {applicationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleSidebarClick(category.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r " +
                    category.color +
                    " text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <category.icon className="h-5 w-5" />
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">{category.title}</div>
                {/* <div
                  className={`text-xs ${selectedCategory === category.id ? "text-white/80" : "text-gray-400"}`}
                >
                  {category.applications.length} links
                </div> */}
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-transform ${selectedCategory === category.id ? "rotate-90" : ""}`}
              />
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto hidden">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Recent Apps</h3>
            {recentApps.map((app, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <app.icon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {app.name}
                  </div>
                  <div className="text-xs text-gray-500">{app.lastUsed}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-80">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-lg lg:text-2xl font-bold text-gray-900">
                    Good morning, Sulaiman! 👋
                  </h1>
                  <p className="text-gray-600 hidden md:block">
                    Ready to continue your learning journey?
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 max-w-52">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 text-sm" />
                  <Input
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 max-w-80 bg-gray-50 border-0"
                  />
                </div>
                <Button variant="ghost" size="icon" className="relative hidden">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-bold text-gray-900">
                Your Stats
              </AccordionTrigger>
              <AccordionContent>
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {quickStats.map((stat, index) => (
                    <Card
                      key={index}
                      className="bg-white/60 backdrop-blur-sm border-0 shadow-lg last:col-span-2 md:last:col-span-1"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              {stat.label}
                            </p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">
                              {stat.value}
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                              {stat.change}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:flex items-center justify-center hidden ">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Category Header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {
                  applicationCategories.find(
                    (cat) => cat.id === selectedCategory
                  )?.title
                }
              </h2>
              <p className="text-gray-600 mt-1 text-balance">
                {
                  applicationCategories.find(
                    (cat) => cat.id === selectedCategory
                  )?.description
                }
              </p>
            </div>
            <Badge variant="outline" className="text-sm text-nowrap">
              {filteredApps.length} Links
            </Badge>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredApps.map((app, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:${app.color} hover:ring-2 grid grid-cols-2 md:grid-cols-1`}
              >
                <div className="relative">
                  <Image
                    src="/s-portal.jpg"
                    alt={app.name || "Placeholder"}
                    width={1000}
                    height={1000}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {app.popular && (
                      <Badge className="bg-yellow-500 text-white border-0">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div
                      className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <app.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-gray-600 md:text-sm text-xs mb-4">
                    {app.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${app.color} p-0 px-2 text-white`}
                    >
                      App Link
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No applications found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search query or browse different categories.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
