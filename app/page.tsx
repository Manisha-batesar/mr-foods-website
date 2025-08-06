import Link from 'next/link'
import { Play, Star, Users, Clock, Award } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Video */}
          <div className="relative">
            <video
              className="w-full h-[400px] object-cover hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster="/delicious-food-montage.png"
            >
              <source src="/food-preparation-video.mp4" type="video/mp4" />
              <source src="/food-preparation-video.webm" type="video/webm" />
              {/* Fallback image */}
              <img 
                src="/delicious-food-montage.png" 
                alt="Delicious food dishes"
                className="w-full h-[400px] object-cover hero-video"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent hero-video flex items-end">
              <div className="p-6 text-white">
                <div className="flex items-center space-x-3 bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Kitchen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-purple-50 shadow-xl flex items-center justify-center border-3 border-purple-200 mr-4 logo-float">
                  <div className="text-xl font-black gradient-text">MR</div>
                </div>
                <div className="flex flex-col">
                  <span className="gradient-text text-3xl font-black tracking-tight">𝗠𝗥 Foods</span>
                  <span className="text-sm text-gray-500 font-medium tracking-widest">PREMIUM DINING</span>
                </div>
              </div>
              <span className="gradient-text">Taste the</span>
              <br />
              <span className="gradient-text">Excellence</span>
            </h1>
            
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                🍽️ <strong>Premium Quality:</strong> Every dish crafted with the finest ingredients and authentic flavors that tell a story.
              </p>
              <p>
                ⭐ <strong>Trusted by Thousands:</strong> Join our family of satisfied customers who choose quality over everything.
              </p>
              <p>
                ❤️ <strong>Passion in Every Bite:</strong> Our chefs pour their heart into creating memorable culinary experiences.
              </p>
              <p>
                🚀 <strong>Fast & Fresh:</strong> Quick delivery without compromising on taste, because your time matters.
              </p>
              <p>
                🌟 <strong>Your Satisfaction:</strong> We don't just serve food, we serve happiness on a plate.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/menu" className="btn-primary text-center">
                Explore Our Menu
              </Link>
              <Link href="/order-now" className="btn-secondary text-center">
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ background: 'linear-gradient(135deg, #F8F4FF, #ffffff)' }} className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg card-hover">
                <Users style={{ color: '#CF9FFF' }} className="mx-auto mb-4" size={40} />
                <div className="text-3xl font-bold" style={{ color: '#CF9FFF' }}>10K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg card-hover">
                <Star style={{ color: '#CF9FFF' }} className="mx-auto mb-4" size={40} />
                <div className="text-3xl font-bold" style={{ color: '#CF9FFF' }}>4.9</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg card-hover">
                <Clock style={{ color: '#CF9FFF' }} className="mx-auto mb-4" size={40} />
                <div className="text-3xl font-bold" style={{ color: '#CF9FFF' }}>15</div>
                <div className="text-gray-600">Minutes Delivery</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg card-hover">
                <Award style={{ color: '#CF9FFF' }} className="mx-auto mb-4" size={40} />
                <div className="text-3xl font-bold" style={{ color: '#CF9FFF' }}>50+</div>
                <div className="text-gray-600">Menu Items</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
