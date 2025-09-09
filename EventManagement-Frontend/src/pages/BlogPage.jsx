// import React from 'react'
// import NavbarComponent from '../component/NavbarComponent'
// import FooterComponent from '../component/FooterComponent'

// export default function BlogPage() {
//   return (
//     <div>
//         <NavbarComponent/>
//       <section class="py-10 bg-gray-900 sm:py-16 lg:py-24">
//     <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//         <div class="max-w-2xl mx-auto text-center">
//             <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Stories from blog</h2>
//             <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-200">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
//         </div>

//         <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full lg:gap-14">
//             <div class="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
//                 <div class="flex flex-col justify-between flex-1 px-5 py-6">
//                     <div class="flex-shrink-0">
//                         <span class="block text-xs font-semibold tracking-widest text-orange-500 uppercase"> Lifestyle </span>
//                     </div>

//                     <div class="flex-1 mt-28">
//                         <p class="text-2xl font-semibold">
//                             <a href="#" title="" class="text-black"> Power of habit: How to learn anything in 30 days. </a>
//                         </p>
//                         <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
//                     </div>
//                 </div>

//                 <div class="border-t border-gray-200">
//                     <div class="flex">
//                         <div class="flex items-center flex-1 px-6 py-5">
//                             <img class="object-cover w-8 h-8 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/3/avatar-1.jpg" alt="" />
//                             <span class="flex-1 block min-w-0 ml-3 text-base font-semibold text-gray-900 truncate"> Wade Warren </span>
//                         </div>

//                         <a href="#" title="" class="inline-flex items-center flex-shrink-0 px-4 py-5 text-base font-semibold transition-all duration-200 bg-white border-l border-gray-200 hover:bg-blue-600 hover:text-white">
//                             Read more
//                             <svg class="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
//                             </svg>
//                         </a>
//                     </div>
//                 </div>
//             </div>

//             <div class="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
//                 <div class="flex flex-col justify-between flex-1 px-5 py-6">
//                     <div class="flex-shrink-0">
//                         <span class="block text-xs font-semibold tracking-widest text-orange-500 uppercase"> Technology </span>
//                     </div>

//                     <div class="flex-1 mt-28">
//                         <p class="text-2xl font-semibold">
//                             <a href="#" title="" class="text-black"> 10 Zoom hacks you can do for productive meetings. </a>
//                         </p>
//                         <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
//                     </div>
//                 </div>

//                 <div class="border-t border-gray-200">
//                     <div class="flex">
//                         <div class="flex items-center flex-1 px-6 py-5">
//                             <img class="object-cover w-8 h-8 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/3/avatar-2.jpg" alt="" />
//                             <span class="flex-1 block min-w-0 ml-3 text-base font-semibold text-gray-900 truncate"> Leslie Alexander </span>
//                         </div>

//                         <a href="#" title="" class="inline-flex items-center flex-shrink-0 px-4 py-5 text-base font-semibold transition-all duration-200 bg-white border-l border-gray-200 hover:bg-blue-600 hover:text-white">
//                             Read more
//                             <svg class="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
//                             </svg>
//                         </a>
//                     </div>
//                 </div>
//             </div>

//             <div class="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
//                 <div class="flex flex-col justify-between flex-1 px-5 py-6">
//                     <div class="flex-shrink-0">
//                         <span class="block text-xs font-semibold tracking-widest text-orange-500 uppercase"> Marketing </span>
//                     </div>

//                     <div class="flex-1 mt-28">
//                         <p class="text-2xl font-semibold">
//                             <a href="#" title="" class="text-black"> 6 Product launching emails you want to use next. </a>
//                         </p>
//                         <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
//                     </div>
//                 </div>

//                 <div class="border-t border-gray-200">
//                     <div class="flex">
//                         <div class="flex items-center flex-1 px-6 py-5">
//                             <img class="object-cover w-8 h-8 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/3/avatar-3.jpg" alt="" />
//                             <span class="flex-1 block min-w-0 ml-3 text-base font-semibold text-gray-900 truncate"> Jenny Wilson </span>
//                         </div>

//                         <a href="#" title="" class="inline-flex items-center flex-shrink-0 px-4 py-5 text-base font-semibold transition-all duration-200 bg-white border-l border-gray-200 hover:bg-blue-600 hover:text-white">
//                             Read more
//                             <svg class="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
//                             </svg>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
        
//     </div>
// </section>
// <FooterComponent/>
//     </div>
//   )
// }




                     // NEW WORK OF BLOG PAGE



                     






import React from 'react'
import { Link } from 'react-router-dom'
import NavbarComponent from '../component/NavbarComponent'
import FooterComponent from '../component/FooterComponent'
import { ArrowRight, Calendar, User, Clock, Tag } from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      category: "Lifestyle",
      title: "Power of habit: How to learn anything in 30 days",
      excerpt: "Discover the science behind habit formation and how you can leverage it to master new skills in just one month.",
      author: "Wade Warren",
      authorImage: "https://cdn.rareblocks.xyz/collection/celebration/images/blog/3/avatar-1.jpg",
      readTime: "5 min read",
      date: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      category: "Technology",
      title: "10 Zoom hacks you can do for productive meetings",
      excerpt: "Transform your virtual meetings with these expert tips and hidden features that will boost productivity and engagement.",
      author: "Leslie Alexander",
      authorImage: "https://cdn.rareblocks.xyz/collection/celebration/images/blog/3/avatar-2.jpg",
      readTime: "7 min read",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      category: "Marketing",
      title: "6 Product launching emails you want to use next",
      excerpt: "Learn the most effective email templates that drive conversions and create buzz around your product launches.",
      author: "Jenny Wilson",
      authorImage: "https://cdn.rareblocks.xyz/collection/celebration/images/blog/3/avatar-3.jpg",
      readTime: "6 min read",
      date: "March 8, 2024",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      category: "Events",
      title: "Creating memorable virtual event experiences",
      excerpt: "Transform your online events into engaging experiences that attendees will remember long after they're over.",
      author: "Robert Fox",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      readTime: "8 min read",
      date: "March 5, 2024",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      category: "Design",
      title: "The psychology behind effective event design",
      excerpt: "Understand how color, layout, and spatial design influence attendee behavior and event success.",
      author: "Courtney Henry",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      readTime: "9 min read",
      date: "March 3, 2024",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      category: "Strategy",
      title: "Building community through recurring events",
      excerpt: "Learn how to create events that foster lasting communities and drive ongoing engagement.",
      author: "Devon Lane",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      readTime: "10 min read",
      date: "March 1, 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Lifestyle": "from-orange-500 to-orange-600",
      "Technology": "from-blue-500 to-blue-600",
      "Marketing": "from-purple-500 to-purple-600",
      "Events": "from-green-500 to-green-600",
      "Design": "from-pink-500 to-pink-600",
      "Strategy": "from-indigo-500 to-indigo-600"
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavbarComponent/>

       {/* Hero Section with Banner Image */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
              {/* Banner Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                // src="public/homepage_banner.png"
                  src="/public/homepage_banner.png"
                  alt="EventSphere Banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-purple-900/60"></div>
              </div>
      
              {/* Content */}
              <div className="px-4 mx-auto max-w-screen-xl text-center z-10 relative">
                <h1 className="mb-6 text-5xl font-bold tracking-tight leading-tight text-white md:text-6xl lg:text-7xl">
                  EventSphere Blog
                </h1>
                <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-100">
              Discover insights, tips, and stories about event planning, technology, and creating unforgettable experiences.
            </p>
                <div className="mt-8">
              <div className="inline-flex bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                <Tag className="w-4 h-4 mr-2" />
                Latest news and insights
              </div>
            </div>
              </div>
            </section>
      
      {/* Blog Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
           <h1 className="mb-6 text-5xl font-bold tracking-tight leading-tight text-black md:text-6xl lg:text-7xl">
                  Feature Stories
                </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our collection of articles designed to help you create better events and engage your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Post Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">Author</p>
                      </div>
                    </div>

                  
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          {/* <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white font-semibold rounded-lg hover:from-[#4F4BFF] hover:to-[#7A0FDA] transition-all duration-300 transform hover:scale-105">
              Load More Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div> */}
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Stay Updated with EventSphere
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Get the latest event tips, industry insights, and exclusive content delivered to your inbox.
          </p>
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white font-semibold rounded-lg hover:from-[#4F4BFF] hover:to-[#7A0FDA] transition-colors">
                Subscribe
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section> */}

      <FooterComponent/>
    </div>
  )
}