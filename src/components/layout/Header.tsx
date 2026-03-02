import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useDemo } from "@/context/DemoContext"
import { Logo } from "@/components/common/Logo"
import { 
  Search, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  ChevronDown,
  Pickaxe,
  Wind,
  Map,
  Coins,
  Handshake,
  Users,
  BookOpen,
  Tv,
  Info,
  Cpu,
  Gem,
  ShieldCheck
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationBellDropdown } from "@/components/notifications/NotificationBellDropdown"
import { COMMODITY_TAXONOMY } from "@/data/commodityTaxonomy"
import { LOCATION_TAXONOMY } from "@/data/locationTaxonomy"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const { isAuthenticated, userRole, logout } = useDemo()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const location = useLocation()

  const isAuthPage = location.pathname.startsWith('/auth')
  const isDarkMode = location.pathname.startsWith('/mxe-tv') || location.pathname.startsWith('/marketplace') || location.pathname.startsWith('/app')
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isAuthPage) return null

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300",
      isDarkMode 
        ? "bg-slate-950 border-b-0" 
        : "bg-white/95",
      isScrolled 
        ? (isDarkMode ? "bg-slate-950 shadow-sm shadow-black/50" : "border-b border-slate-200 shadow-sm") 
        : "border-b border-transparent"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo variant={isDarkMode ? "dark" : "light"} className="h-9" />
          </Link>

          {/* Desktop Nav */}
          <nav className={cn(
            "hidden lg:flex items-center gap-1 text-sm font-medium",
            isDarkMode ? "text-slate-300" : "text-slate-600"
          )}>
            {/* Commodities Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                  "gap-1",
                  isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}>
                  Commodities <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={cn("w-[800px] p-0", isDarkMode ? "bg-slate-950 border-white/10 text-slate-300" : "bg-white")}>
                <div className="grid grid-cols-4 gap-6 p-6">
                  {COMMODITY_TAXONOMY.map((sector) => (
                    <div key={sector.id} className="space-y-3">
                      <h4 className={cn("font-semibold text-sm border-b pb-2", isDarkMode ? "text-white border-white/10" : "text-slate-900 border-slate-100")}>{sector.name}</h4>
                      <ul className="space-y-1">
                        {sector.commodities.slice(0, 5).map((commodity) => (
                          <li key={commodity.id}>
                            <Link 
                              to={`/search?commodity=${commodity.id}`}
                              className={cn(
                                "text-sm px-2 py-1.5 rounded-md transition-colors block",
                                isDarkMode ? "text-slate-400 hover:text-brand-orange hover:bg-white/5" : "text-slate-500 hover:text-brand-orange hover:bg-slate-50"
                              )}
                            >
                              {commodity.name}
                            </Link>
                          </li>
                        ))}
                        {sector.commodities.length > 5 && (
                          <li>
                            <Link 
                              to={`/search?sector=${sector.id}`}
                              className="text-xs font-medium text-brand-orange hover:underline px-2 py-1 block"
                            >
                              View all {sector.name}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className={cn("p-4 border-t flex justify-between items-center", isDarkMode ? "bg-slate-900 border-white/10" : "bg-slate-50 border-slate-100")}>
                  <p className={cn("text-sm", isDarkMode ? "text-slate-400" : "text-slate-500")}>Looking for something specific?</p>
                  <Button variant="outline" size="sm" className={cn("transition-colors", isDarkMode ? "bg-slate-950 border-white/10 text-brand-orange hover:bg-brand-orange hover:text-white" : "bg-white border-slate-200 text-brand-orange hover:bg-brand-orange hover:text-white")} asChild>
                    <Link to="/search">View All Commodities &rarr;</Link>
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Locations Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                  "gap-1",
                  isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}>
                  Locations <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={cn("w-[600px] p-0", isDarkMode ? "bg-slate-950 border-white/10 text-slate-300" : "bg-white")}>
                <div className="grid grid-cols-3 gap-6 p-6">
                  {LOCATION_TAXONOMY.map((region) => (
                    <div key={region.id} className="space-y-3">
                      <h4 className={cn("font-semibold text-sm border-b pb-2", isDarkMode ? "text-white border-white/10" : "text-slate-900 border-slate-100")}>{region.name}</h4>
                      <ul className="space-y-1">
                        {region.countries.slice(0, 5).map((country) => (
                          <li key={country.name}>
                            <Link 
                              to={`/search?location=${country.name}`}
                              className={cn(
                                "text-sm px-2 py-1.5 rounded-md transition-colors block",
                                isDarkMode ? "text-slate-400 hover:text-brand-orange hover:bg-white/5" : "text-slate-500 hover:text-brand-orange hover:bg-slate-50"
                              )}
                            >
                              {country.name}
                            </Link>
                          </li>
                        ))}
                        {region.countries.length > 5 && (
                          <li>
                            <Link 
                              to={`/search?region=${region.id}`}
                              className="text-xs font-medium text-brand-orange hover:underline px-2 py-1 block"
                            >
                              View all {region.name}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className={cn("p-4 border-t flex justify-between items-center", isDarkMode ? "bg-slate-900 border-white/10" : "bg-slate-50 border-slate-100")}>
                  <p className={cn("text-sm", isDarkMode ? "text-slate-400" : "text-slate-500")}>Explore by map?</p>
                  <Button variant="outline" size="sm" className={cn("transition-colors", isDarkMode ? "bg-slate-950 border-white/10 text-brand-orange hover:bg-brand-orange hover:text-white" : "bg-white border-slate-200 text-brand-orange hover:bg-brand-orange hover:text-white")} asChild>
                    <Link to="/search">View All Locations &rarr;</Link>
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* List an Asset Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                  "gap-1",
                  isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}>
                  List an Asset <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={cn("w-80 p-0", isDarkMode ? "bg-slate-950 border-white/10 text-slate-300" : "bg-white")}>
                <div className={cn("p-4 border-b", isDarkMode ? "border-white/10" : "border-slate-100")}>
                  <h4 className={cn("font-semibold text-sm", isDarkMode ? "text-white" : "text-slate-900")}>Select Asset Type</h4>
                  <p className={cn("text-xs mt-1", isDarkMode ? "text-slate-400" : "text-slate-500")}>Choose the category that best fits your asset.</p>
                </div>
                <div className="p-2 space-y-1">
                  <DropdownMenuItem asChild className={cn("cursor-pointer rounded-lg px-3 py-2.5", isDarkMode ? "focus:bg-white/5" : "focus:bg-slate-50")}>
                    <Link to="/list/mining-project/step/1" className="flex items-start gap-3">
                      <div className={cn("p-2 rounded-md mt-0.5", isDarkMode ? "bg-slate-900" : "bg-slate-100")}>
                        <Pickaxe className={cn("h-4 w-4", isDarkMode ? "text-slate-400" : "text-slate-600")} />
                      </div>
                      <div>
                        <span className={cn("text-sm font-medium block", isDarkMode ? "text-white" : "text-slate-900")}>Mining Project</span>
                        <span className={cn("text-xs block mt-0.5", isDarkMode ? "text-slate-400" : "text-slate-500")}>Exploration, Development, Production</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className={cn("cursor-pointer rounded-lg px-3 py-2.5", isDarkMode ? "focus:bg-white/5" : "focus:bg-slate-50")}>
                    <Link to="/list/renewable-asset/step/1" className="flex items-start gap-3">
                      <div className={cn("p-2 rounded-md mt-0.5", isDarkMode ? "bg-slate-900" : "bg-slate-100")}>
                        <Wind className={cn("h-4 w-4", isDarkMode ? "text-slate-400" : "text-slate-600")} />
                      </div>
                      <div>
                        <span className={cn("text-sm font-medium block", isDarkMode ? "text-white" : "text-slate-900")}>Renewable Asset</span>
                        <span className={cn("text-xs block mt-0.5", isDarkMode ? "text-slate-400" : "text-slate-500")}>Solar, Wind, Hydro Projects</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className={cn("cursor-pointer rounded-lg px-3 py-2.5", isDarkMode ? "focus:bg-white/5" : "focus:bg-slate-50")}>
                    <Link to="/list/claim/step/1" className="flex items-start gap-3">
                      <div className={cn("p-2 rounded-md mt-0.5", isDarkMode ? "bg-slate-900" : "bg-slate-100")}>
                        <Map className={cn("h-4 w-4", isDarkMode ? "text-slate-400" : "text-slate-600")} />
                      </div>
                      <div>
                        <span className={cn("text-sm font-medium block", isDarkMode ? "text-white" : "text-slate-900")}>Claim</span>
                        <span className={cn("text-xs block mt-0.5", isDarkMode ? "text-slate-400" : "text-slate-500")}>Mineral Rights & Tenements</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className={cn("cursor-pointer rounded-lg px-3 py-2.5", isDarkMode ? "focus:bg-white/5" : "focus:bg-slate-50")}>
                    <Link to="/list/royalty-asset/step/1" className="flex items-start gap-3">
                      <div className={cn("p-2 rounded-md mt-0.5", isDarkMode ? "bg-slate-900" : "bg-slate-100")}>
                        <Coins className={cn("h-4 w-4", isDarkMode ? "text-slate-400" : "text-slate-600")} />
                      </div>
                      <div>
                        <span className={cn("text-sm font-medium block", isDarkMode ? "text-white" : "text-slate-900")}>Royalty Asset</span>
                        <span className={cn("text-xs block mt-0.5", isDarkMode ? "text-slate-400" : "text-slate-500")}>NSR, GRR, Streaming</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={cn("my-1", isDarkMode ? "bg-white/10" : "bg-slate-100")} />
                  <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5 bg-brand-orange/5 focus:bg-brand-orange/10">
                    <Link to="/list/offtake/step/1" className="flex items-start gap-3">
                      <div className="bg-brand-orange/10 p-2 rounded-md mt-0.5">
                        <Handshake className="h-4 w-4 text-brand-orange" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-brand-orange block">List an Offtake</span>
                        <span className="text-xs text-brand-orange/70 block mt-0.5">Sell Future Production</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
                <div className={cn("p-3 border-t text-center", isDarkMode ? "bg-slate-900 border-white/10" : "bg-slate-50 border-slate-100")}>
                  <p className={cn("text-xs", isDarkMode ? "text-slate-400" : "text-slate-500")}>Need help listing? <Link to="/enquiry" className="text-brand-orange font-medium hover:underline">Contact Support</Link></p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" asChild className={cn(
              isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}>
              <Link to="/marketplace">Marketplace</Link>
            </Button>
            <Button variant="ghost" asChild className={cn(
              isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}>
              <Link to="/insights">Insights</Link>
            </Button>

            {/* Explore Mega Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                  "gap-1",
                  isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}>
                  Explore <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={cn("w-[600px] p-0 overflow-hidden", isDarkMode ? "bg-slate-950 border-white/10" : "bg-white")}>
                <div className={cn("grid grid-cols-3 h-full", isDarkMode ? "bg-slate-950" : "bg-white")}>
                  <div className="col-span-2 p-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h4 className={cn("font-semibold text-sm mb-4 flex items-center gap-2", isDarkMode ? "text-white" : "text-slate-900")}>
                          <LayoutDashboard className="h-4 w-4 text-slate-400" /> Platform
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            <Link to="/agents" className={cn("flex items-center gap-3 text-sm p-2 rounded-lg transition-colors", isDarkMode ? "text-slate-400 hover:text-brand-orange hover:bg-white/5" : "text-slate-600 hover:text-brand-orange hover:bg-slate-50")}>
                              <Users className="h-4 w-4 text-slate-400" /> 
                              <span>Explore Agents</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/agents/become" className={cn("flex items-center gap-3 text-sm p-2 rounded-lg transition-colors", isDarkMode ? "text-slate-400 hover:text-brand-orange hover:bg-white/5" : "text-slate-600 hover:text-brand-orange hover:bg-slate-50")}>
                              <Briefcase className="h-4 w-4 text-slate-400" /> 
                              <span>Become an Agent</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/how-to-guides" className={cn("flex items-center gap-3 text-sm p-2 rounded-lg transition-colors", isDarkMode ? "text-slate-400 hover:text-brand-orange hover:bg-white/5" : "text-slate-600 hover:text-brand-orange hover:bg-slate-50")}>
                              <BookOpen className="h-4 w-4 text-slate-400" /> 
                              <span>How-To Guides</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/buyer-interest" className={cn("flex items-center gap-3 text-sm p-2 rounded-lg transition-colors", isDarkMode ? "text-slate-400 hover:text-brand-orange hover:bg-white/5" : "text-slate-600 hover:text-brand-orange hover:bg-slate-50")}>
                              <Briefcase className="h-4 w-4 text-slate-400" /> 
                              <span>Buyer Interest</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className={cn("font-semibold text-sm mb-4 flex items-center gap-2", isDarkMode ? "text-white" : "text-slate-900")}>
                          <Tv className="h-4 w-4 text-slate-400" /> Content
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            <Link to="/mxe-tv" className={cn("flex items-center gap-3 text-sm p-2 rounded-lg transition-colors", isDarkMode ? "text-slate-400 hover:text-brand-orange hover:bg-white/5" : "text-slate-600 hover:text-brand-orange hover:bg-slate-50")}>
                              <Tv className="h-4 w-4 text-slate-400" /> 
                              <span>MXE TV</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/about" className={cn("flex items-center gap-3 text-sm p-2 rounded-lg transition-colors", isDarkMode ? "text-slate-400 hover:text-brand-orange hover:bg-white/5" : "text-slate-600 hover:text-brand-orange hover:bg-slate-50")}>
                              <Info className="h-4 w-4 text-slate-400" /> 
                              <span>About Us</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={cn("col-span-1 p-6 border-l", isDarkMode ? "bg-slate-900 border-white/10" : "bg-slate-50 border-slate-100")}>
                    <h4 className={cn("font-semibold text-sm mb-4", isDarkMode ? "text-white" : "text-slate-900")}>Strategic Partners</h4>
                    <div className="space-y-4">
                      <Link to="/partners/nora" className={cn("block group p-3 rounded-xl border shadow-sm hover:shadow-md hover:border-brand-orange/30 transition-all", isDarkMode ? "bg-slate-950 border-white/10" : "bg-white border-slate-200")}>
                        <div className="flex items-center gap-2 mb-1 group-hover:text-brand-orange transition-colors">
                          <img 
                            src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/Nore%20Logo.png" 
                            alt="NORA" 
                            className="h-6 w-auto object-contain"
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight">Future Technologies Partner</p>
                      </Link>
                      
                      <Link to="/partners/reetoken" className={cn("block group p-3 rounded-xl border shadow-sm hover:shadow-md hover:border-brand-orange/30 transition-all", isDarkMode ? "bg-slate-950 border-white/10" : "bg-white border-slate-200")}>
                        <div className="flex items-center gap-2 mb-1 group-hover:text-brand-orange transition-colors">
                          <img 
                            src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/REELogo.png" 
                            alt="REEToken" 
                            className="h-6 w-auto object-contain"
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight">Digital Asset Tokenization</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className={cn(
            "lg:hidden",
            isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-500 hover:text-slate-900"
          )}>
            <Search className="h-5 w-5" />
          </Button>

            {isAuthenticated ? (
            <>
              <NotificationBellDropdown />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-slate-200 transition-all">
                    <Avatar className="h-9 w-9 border border-slate-200">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>MX</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={cn("w-80 p-0", isDarkMode ? "bg-slate-950 border-white/10 text-slate-300" : "bg-white")} align="end" forceMount>
                  {/* Section 1: User Identity */}
                  <div className={cn("p-4 border-b", isDarkMode ? "border-white/10" : "border-slate-100")}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border border-slate-200">
                          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                          <AvatarFallback>MX</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-semibold truncate", isDarkMode ? "text-white" : "text-slate-900")}>John Doe</p>
                        <p className="text-xs text-slate-500 truncate">
                          {userRole === 'individual' ? 'Individual Investor' : 
                           userRole === 'agent' ? 'Authorized Agent' : 
                           userRole === 'agent' ? 'Verified Agent' : 
                           userRole === 'service_provider' ? 'Service Provider' : 'Admin'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Primary Navigation */}
                  <div className="p-2 space-y-1">
                    {userRole === 'admin' && (
                      <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5 focus:bg-brand-orange/5">
                        <Link to="/admin/dashboard" className="flex items-center gap-3">
                          <ShieldCheck className="h-4 w-4 text-brand-orange" />
                          <span className="text-sm font-medium text-brand-orange">Admin Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild className={cn("cursor-pointer rounded-lg px-3 py-2.5", isDarkMode ? "focus:bg-white/5" : "focus:bg-slate-50")}>
                      <Link to="/app/dashboard" className="flex items-center gap-3">
                        <LayoutDashboard className="h-4 w-4 text-slate-500" />
                        <span className={cn("text-sm font-medium", isDarkMode ? "text-slate-300" : "text-slate-700")}>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={cn("cursor-pointer rounded-lg px-3 py-2.5", isDarkMode ? "focus:bg-white/5" : "focus:bg-slate-50")}>
                      <Link to="/app/listings" className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-slate-500" />
                        <span className={cn("text-sm font-medium", isDarkMode ? "text-slate-300" : "text-slate-700")}>My Listings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={cn("cursor-pointer rounded-lg px-3 py-2.5", isDarkMode ? "focus:bg-white/5" : "focus:bg-slate-50")}>
                      <Link to="/app/account" className="flex items-center gap-3">
                        <User className="h-4 w-4 text-slate-500" />
                        <span className={cn("text-sm font-medium", isDarkMode ? "text-slate-300" : "text-slate-700")}>Account</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={cn("cursor-pointer rounded-lg px-3 py-2.5", isDarkMode ? "focus:bg-white/5" : "focus:bg-slate-50")}>
                      <Link to="/how-to-guides" className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-slate-500" />
                        <span className={cn("text-sm font-medium", isDarkMode ? "text-slate-300" : "text-slate-700")}>Help & Guides</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className={cn("my-0", isDarkMode ? "bg-white/10" : "bg-slate-100")} />

                  {/* Section 3: Membership/Plan */}
                  <div className="p-4">
                    <div className={cn("rounded-lg p-3 border flex items-center justify-between", isDarkMode ? "bg-slate-900 border-white/10" : "bg-slate-50 border-slate-100")}>
                      <div>
                        <p className={cn("text-sm font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>Starter Plan</p>
                        <p className="text-xs text-slate-500">Free until May 1st 2026</p>
                      </div>
                      <Button size="sm" variant="outline" className={cn("h-8 text-xs", isDarkMode ? "bg-slate-950 border-white/10 text-white hover:text-brand-orange hover:border-brand-orange/30" : "bg-white border-slate-200 text-slate-900 hover:text-brand-orange hover:border-brand-orange/30")} asChild>
                        <Link to="/pricing">Upgrade</Link>
                      </Button>
                    </div>
                  </div>

                  <DropdownMenuSeparator className={cn("my-0", isDarkMode ? "bg-white/10" : "bg-slate-100")} />

                  {/* Section 4: Footer */}
                  <div className="p-2">
                    <DropdownMenuItem onClick={logout} className="cursor-pointer rounded-lg px-3 py-2.5 text-red-600 focus:text-red-700 focus:bg-red-50">
                      <div className="flex items-center gap-3">
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm font-medium">Log out</span>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className={cn(
                "hidden sm:inline-flex",
                isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900"
              )}>
                <Link to="/auth/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white shadow-sm shadow-brand-orange/20">
                <Link to="/auth/sign-up">Join Now</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "lg:hidden",
              isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 absolute w-full shadow-lg animate-in slide-in-from-top-5 h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="flex flex-col space-y-4 pb-20">
            {/* Mobile Commodities */}
            <div className="space-y-2">
              <div className="px-2 py-1 text-sm font-semibold text-slate-900">Commodities</div>
              <div className="pl-4 space-y-2 border-l-2 border-slate-100 ml-2">
                {COMMODITY_TAXONOMY.map(sector => (
                  <details key={sector.id} className="group">
                    <summary className="flex items-center justify-between text-sm text-slate-600 py-1 cursor-pointer hover:text-brand-orange">
                      {sector.name} <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180"/>
                    </summary>
                    <div className="pl-3 mt-1 space-y-1">
                      {sector.commodities.slice(0, 4).map(c => (
                        <Link key={c.id} to={`/search?commodity=${c.id}`} className="block text-xs text-slate-500 py-1 hover:text-brand-orange" onClick={() => setIsMobileMenuOpen(false)}>
                          {c.name}
                        </Link>
                      ))}
                      <Link to={`/search?sector=${sector.id}`} className="block text-xs font-medium text-brand-orange py-1" onClick={() => setIsMobileMenuOpen(false)}>
                        View All
                      </Link>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Mobile Locations */}
            <div className="space-y-2">
              <div className="px-2 py-1 text-sm font-semibold text-slate-900">Locations</div>
              <div className="pl-4 space-y-2 border-l-2 border-slate-100 ml-2">
                {LOCATION_TAXONOMY.map((region) => (
                  <details key={region.id} className="group">
                    <summary className="flex items-center justify-between text-sm text-slate-600 py-1 cursor-pointer hover:text-brand-orange list-none">
                      {region.name} <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180"/>
                    </summary>
                    <div className="pl-3 mt-1 space-y-1">
                      {region.countries.slice(0, 4).map((country) => (
                        <Link 
                          key={country.name} 
                          to={`/search?location=${country.name}`} 
                          className="block text-xs text-slate-500 py-1 hover:text-brand-orange" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {country.name}
                        </Link>
                      ))}
                      <Link 
                        to={`/search?region=${region.id}`} 
                        className="block text-xs font-medium text-brand-orange py-1" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        View All
                      </Link>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Mobile Explore */}
            <div className="space-y-2">
              <div className="px-2 py-1 text-sm font-semibold text-slate-900">Explore</div>
              <div className="pl-4 space-y-2 border-l-2 border-slate-100 ml-2">
                <details className="group">
                  <summary className="flex items-center justify-between text-sm text-slate-600 py-1 cursor-pointer hover:text-brand-orange list-none">
                    Strategic Partners <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180"/>
                  </summary>
                  <div className="pl-3 mt-1 space-y-2">
                    <Link to="/partners/nora" className="flex items-center gap-2 text-xs text-slate-600 py-1 hover:text-brand-orange" onClick={() => setIsMobileMenuOpen(false)}>
                      <img src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/Nore%20Logo.png" alt="NORA" className="h-5 w-auto object-contain" />
                    </Link>
                    <Link to="/partners/reetoken" className="flex items-center gap-2 text-xs text-slate-600 py-1 hover:text-brand-orange" onClick={() => setIsMobileMenuOpen(false)}>
                      <img src="https://pub-a5745bb2a56d4cb0a6acea2e8f8fda37.r2.dev/REELogo.png" alt="REEToken" className="h-5 w-auto object-contain" />
                    </Link>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between text-sm text-slate-600 py-1 cursor-pointer hover:text-brand-orange list-none">
                    Platform <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180"/>
                  </summary>
                  <div className="pl-3 mt-1 space-y-1">
                    <Link to="/agents" className="block text-xs text-slate-500 py-1 hover:text-brand-orange" onClick={() => setIsMobileMenuOpen(false)}>Explore Agents</Link>
                    <Link to="/agents/become" className="block text-xs text-slate-500 py-1 hover:text-brand-orange" onClick={() => setIsMobileMenuOpen(false)}>Become an Agent</Link>
                    <Link to="/how-to-guides" className="block text-xs text-slate-500 py-1 hover:text-brand-orange" onClick={() => setIsMobileMenuOpen(false)}>How-To Guides</Link>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between text-sm text-slate-600 py-1 cursor-pointer hover:text-brand-orange list-none">
                    Content <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180"/>
                  </summary>
                  <div className="pl-3 mt-1 space-y-1">
                    <Link to="/mxe-tv" className="block text-xs text-slate-500 py-1 hover:text-brand-orange" onClick={() => setIsMobileMenuOpen(false)}>MXE TV</Link>
                    <Link to="/about" className="block text-xs text-slate-500 py-1 hover:text-brand-orange" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                  </div>
                </details>
              </div>
            </div>

            <Link to="/list" className="text-sm font-medium text-slate-600 hover:text-brand-orange px-2 py-1 block">List an Asset</Link>
            <Link to="/marketplace" className="text-sm font-medium text-slate-600 hover:text-brand-orange px-2 py-1 block">Marketplace</Link>
            <Link to="/insights" className="text-sm font-medium text-slate-600 hover:text-brand-orange px-2 py-1 block">Insights</Link>
            <div className="border-t border-slate-100 pt-4 mt-2">
               <Link to="/auth/sign-in" className="block w-full text-center py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg mb-2">Sign In</Link>
               <Link to="/auth/sign-up" className="block w-full text-center py-2 text-sm font-medium text-white bg-brand-orange rounded-lg">Join Now</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
