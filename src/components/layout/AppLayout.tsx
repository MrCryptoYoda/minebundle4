import * as React from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#13131A] font-sans text-slate-100">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
