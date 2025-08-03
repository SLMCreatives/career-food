"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  GraduationCap,
  Users,
  FileText,
  Settings,
  BookOpen,
  Trophy,
  Laptop,
  Home,
  LogOut,
  Grid3X3,
  Share2,
  UserCheck,
  Award,
  Database,
  Monitor,
  Layers,
  User,
  Building
} from "lucide-react";

const applicationCategories = [
  {
    title: "Academic Services",
    description: "Course management, exams, and academic resources",
    color: "bg-blue-50 border-blue-200",
    applications: [
      {
        name: "UNIEC Campus",
        description:
          "Access campus-wide learning management system and course materials",
        icon: GraduationCap,
        color: "bg-purple-500",
        href: "#"
      },
      {
        name: "UNIEC College",
        description:
          "College-specific academic portal for course registration and grades",
        icon: Building,
        color: "bg-purple-600",
        href: "#"
      },
      {
        name: "UNIEC Virtual Exam",
        description:
          "Online examination platform for remote and on-campus testing",
        icon: Monitor,
        color: "bg-pink-500",
        href: "#"
      },
      {
        name: "E-tree CMS",
        description:
          "Content management system for academic resources and materials",
        icon: BookOpen,
        color: "bg-green-600",
        href: "#"
      },
      {
        name: "E-tree CMS (Mobile)",
        description:
          "Mobile-optimized version of the content management system",
        icon: BookOpen,
        color: "bg-green-500",
        href: "#"
      },
      {
        name: "CourseNetworking",
        description:
          "Collaborative platform for course discussions and networking",
        icon: Share2,
        color: "bg-red-500",
        href: "#"
      }
    ]
  },
  {
    title: "Administrative Services",
    description: "HR, facilities, and administrative management",
    color: "bg-green-50 border-green-200",
    applications: [
      {
        name: "HRMS",
        description:
          "Human Resource Management System for staff and student records",
        icon: Users,
        color: "bg-gray-600",
        href: "#"
      },
      {
        name: "Facilities",
        description:
          "Book and manage university facilities, rooms, and equipment",
        icon: Building2,
        color: "bg-teal-500",
        href: "#"
      },
      {
        name: "TES",
        description:
          "Teaching Evaluation System for course and instructor feedback",
        icon: UserCheck,
        color: "bg-green-600",
        href: "#"
      },
      {
        name: "One Stop Centre",
        description:
          "Centralized service center for student inquiries and support",
        icon: Grid3X3,
        color: "bg-teal-600",
        href: "#"
      },
      {
        name: "Kaizen HR",
        description:
          "Advanced HR management system for continuous improvement processes",
        icon: User,
        color: "bg-purple-800",
        href: "#"
      }
    ]
  },
  {
    title: "Learning & Development",
    description: "Professional development and certification programs",
    color: "bg-orange-50 border-orange-200",
    applications: [
      {
        name: "UNIEC MCP",
        description:
          "Microsoft Certified Professional training and certification program",
        icon: Award,
        color: "bg-orange-500",
        href: "#"
      },
      {
        name: "UNITAR Passport Programme",
        description:
          "Comprehensive skill development and certification pathway",
        icon: FileText,
        color: "bg-yellow-500",
        href: "#"
      },
      {
        name: "Centre for Academic Excellence",
        description:
          "Resources and support for academic achievement and research",
        icon: Trophy,
        color: "bg-gray-500",
        href: "#"
      },
      {
        name: "LRC",
        description:
          "Learning Resource Centre with digital library and study materials",
        icon: Building2,
        color: "bg-orange-600",
        href: "#"
      },
      {
        name: "SMART",
        description: "Student Monitoring and Academic Resource Tracking system",
        icon: GraduationCap,
        color: "bg-yellow-600",
        href: "#"
      }
    ]
  },
  {
    title: "Technology & Tools",
    description: "Digital tools and IT services",
    color: "bg-purple-50 border-purple-200",
    applications: [
      {
        name: "Office 365",
        description:
          "Microsoft Office suite with email, documents, and collaboration tools",
        icon: Laptop,
        color: "bg-blue-500",
        href: "#"
      },
      {
        name: "TQM Sharepoint",
        description:
          "Total Quality Management document sharing and collaboration platform",
        icon: Share2,
        color: "bg-gray-600",
        href: "#"
      },
      {
        name: "ICT-Asset Mgmt",
        description:
          "IT asset management system for tracking and maintaining equipment",
        icon: Database,
        color: "bg-blue-600",
        href: "#"
      },
      {
        name: "IRC TUTOR APPROVAL",
        description:
          "Internal Review Committee system for tutor approval and management",
        icon: UserCheck,
        color: "bg-gray-600",
        href: "#"
      }
    ]
  },
  {
    title: "System Administration",
    description: "Backend systems and server management",
    color: "bg-red-50 border-red-200",
    applications: [
      {
        name: "UNITAR CMS PRE-PROD SERVER",
        description:
          "Pre-production server environment for testing and development",
        icon: Layers,
        color: "bg-red-600",
        href: "#"
      }
    ]
  }
];

export function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Home className="h-5 w-5 text-gray-600" />
              <LogOut className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">
                Hi, Sulaiman Shafiq Bin Abdul Munaff
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-600">UNITAR</span>
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-blue-600 rounded"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            <Button variant="default" className="rounded-none">
              HOME
            </Button>
            <Button variant="ghost" className="rounded-none">
              <Settings className="h-4 w-4 mr-2" />
              SETTINGS
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            e-Applications
          </h1>
          <p className="text-gray-600">
            Access all your university services and applications in one place
          </p>
        </div>

        <div className="space-y-8">
          {applicationCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className={`${category.color}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      {category.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.applications.length} apps
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.applications.map((app, appIndex) => (
                    <Card
                      key={appIndex}
                      className="hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`${app.color} p-2 rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform`}
                          >
                            <app.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                              {app.name}
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              {app.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center">
            Copyright © 2016 - 2025 Unitar Capital Sdn. Bhd. (842635-T). All
            Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
