
import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Video } from "@/data/mockContent"
import { Calendar, Tag } from "lucide-react"

interface VideoPlayerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  video: Video | null
}

export function VideoPlayerModal({ open, onOpenChange, video }: VideoPlayerModalProps) {
  if (!video) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black text-white border-slate-800">
        <div className="aspect-video w-full bg-slate-900 relative flex items-center justify-center group">
          {/* Mock Video Player */}
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform cursor-pointer">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 rounded text-xs font-mono">
            {video.duration}
          </div>
        </div>
        
        <div className="p-6 bg-slate-900">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <DialogTitle className="text-xl font-bold text-white mb-2">{video.title}</DialogTitle>
              <DialogDescription className="text-slate-400">
                {video.description}
              </DialogDescription>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(video.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <div className="flex gap-2">
                {video.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
