
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Mail, MoreHorizontal } from "lucide-react"

export default function InsightsTeam() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Approved Team</h1>
          <p className="text-slate-400">Manage team members who can access Insights and Leads.</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white border-none">
          <Plus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <Card className="bg-[#1C1C24] border-slate-800 text-slate-300">
        <CardHeader>
          <CardTitle className="text-white">Team Members</CardTitle>
          <CardDescription className="text-slate-400">You have used 2 of 5 available seats on your Tier 1 plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Member 1 (Admin) */}
            <div className="flex items-center justify-between p-4 bg-[#13131A] rounded-lg border border-slate-800">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-slate-700 text-white">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">John Doe (You)</p>
                  <p className="text-sm text-slate-400">john@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-900/50">Admin</Badge>
                <div className="text-sm text-slate-400">Active</div>
              </div>
            </div>

            {/* Member 2 */}
            <div className="flex items-center justify-between p-4 bg-[#13131A] rounded-lg border border-slate-800">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-brand-orange/20 text-brand-orange">SM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">Sarah Miller</p>
                  <p className="text-sm text-slate-400">sarah@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-slate-400 border-slate-700">Member</Badge>
                <div className="text-sm text-slate-400">Active</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Invited Member */}
            <div className="flex items-center justify-between p-4 bg-[#13131A] rounded-lg border border-slate-800 border-dashed">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="font-medium text-white">mike@example.com</p>
                  <p className="text-sm text-slate-400">Invitation sent 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-slate-500 border-slate-700">Pending</Badge>
                <Button variant="ghost" size="sm" className="text-brand-orange hover:text-brand-orange/90 hover:bg-brand-orange/10">Resend</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
