import React, { useState, useEffect } from 'react';
import { Play, Clock, Calendar, ArrowRight, Search, Volume2, Info, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MOCK_VIDEOS, Video } from "@/data/mockContent"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

export default function MxeTvPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [featuredVideo, setFeaturedVideo] = useState<Video>(MOCK_VIDEOS[0])
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleVideoSelect = (video: Video) => {
    setFeaturedVideo(video)
    setIsPlaying(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filter out the featured video from the list
  const queueVideos = MOCK_VIDEOS.filter(v => v.id !== featuredVideo.id)

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20">
      
      {/* Main Content Container with Padding for "Floating" Look */}
      <div className="p-4 md:p-6 lg:p-8">
        
        {/* Hero / Video Player Section */}
        <div className="relative w-full aspect-video max-h-[80vh] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800/50 group">
          
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div 
                key="poster"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <img 
                  src={featuredVideo.thumbnail} 
                  alt={featuredVideo.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                  <div className="max-w-2xl space-y-6">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Badge className="bg-brand-orange text-white hover:bg-brand-orange/90 mb-4 border-none px-3 py-1 text-sm">
                        New Episode
                      </Badge>
                      <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
                        {featuredVideo.title}
                      </h1>
                      <div className="flex items-center gap-4 text-slate-300 text-sm mb-6 font-medium">
                        <span className="text-green-400">98% Match</span>
                        <span>{featuredVideo.publishedAt}</span>
                        <span className="border border-slate-600 px-1.5 rounded text-xs">HD</span>
                        <span>{featuredVideo.duration}</span>
                      </div>
                      <p className="text-lg text-slate-300 line-clamp-3 mb-8 leading-relaxed max-w-xl">
                        {featuredVideo.description}
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-4"
                    >
                      <Button 
                        size="lg" 
                        onClick={handlePlay}
                        className="h-14 px-8 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-bold text-lg transition-transform hover:scale-105"
                      >
                        <Play className="mr-2 h-6 w-6 fill-current" /> Watch Video
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="h-14 px-8 rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm font-semibold text-lg"
                      >
                        <Info className="mr-2 h-6 w-6" /> More Info
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Mute/Volume Icon Placeholder (Visual only) */}
                <div className="absolute bottom-12 right-12 hidden md:flex items-center justify-center h-12 w-12 rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-white">
                  <Volume2 className="h-5 w-5" />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black"
              >
                {/* Mock Video Player (Iframe) */}
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
                
                {/* Close Button (to return to poster) */}
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-8 right-8 bg-black/50 hover:bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-colors border border-white/10"
                >
                  Close Player
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-4 md:px-8 lg:px-12 mt-8 space-y-12">
        
        {/* Trending / Queue Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5">
              See more <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [1,2,3,4].map(i => (
                <Skeleton key={i} className="aspect-video rounded-xl bg-slate-800" />
              ))
            ) : (
              queueVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="group cursor-pointer space-y-3"
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-brand-orange/10 group-hover:border-slate-700">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <div className="h-12 w-12 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                        <Play className="h-5 w-5 ml-1 fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-mono text-white">
                      {video.duration}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200 group-hover:text-white line-clamp-1 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">{video.category}</span>
                      <span>•</span>
                      <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Categories / More Rows */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">New Releases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {/* Just duplicating for visual fullness since we have limited mock data */}
             {queueVideos.slice().reverse().map((video) => (
                <div 
                  key={`rev-${video.id}`} 
                  className="group cursor-pointer space-y-3"
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-brand-orange/10 group-hover:border-slate-700">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                        <Play className="h-5 w-5 ml-1 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200 group-hover:text-white line-clamp-1 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{video.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>

      </div>
    </div>
  )
}
