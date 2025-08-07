import { Heart, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradien``t(135deg, #CF9FFF, #B87FFF)' }} className="text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  <img src="/images/MR-logo.png" className = "rounded-full" alt="" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-3xl font-black mb-1">𝗠𝗥 Foods</h3>
                <div className="text-sm text-white/80 font-medium tracking-widest">
                  DELICIOUS • FRESH • QUALITY
                </div>
              </div>
            </div>
            <p className="text-white opacity-90 mb-4 leading-relaxed">
              Serving delicious, authentic food with love and passion. 
              Your satisfaction is our priority, and quality is our promise.
            </p>
            <div className="flex items-center text-white opacity-90">
              <span>Made with</span>
              <Heart className="mx-2 text-red-400" size={16} />
              <span>for food lovers</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-white opacity-90">
              <div className="flex items-center">
                <Phone size={16} className="mr-3" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-3" />
                <span>info@mrfoods.com</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-3" />
                <span>123 Food Street, Taste City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-white opacity-90">
              <div className="hover:text-white transition-colors cursor-pointer">About Us</div>
              <div className="hover:text-white transition-colors cursor-pointer">Our Story</div>
              <div className="hover:text-white transition-colors cursor-pointer">Careers</div>
              <div className="hover:text-white transition-colors cursor-pointer">Privacy Policy</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white border-opacity-30 mt-8 pt-8 text-center text-white opacity-90">
          <p>&copy; {new Date().getFullYear()} ❤️ MR (Manisha) Foods. All rights reserved. | Delivering happiness, one meal at a time.</p>
        </div>
      </div>
    </footer>
  )
}
