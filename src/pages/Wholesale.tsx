import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, X, MessageCircle, Send, PhoneCall, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Wholesale() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contactMethod: 'WhatsApp',
    social: '',
    question: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `Новая заявка с сайта (Оптовые поставки)\nИнтересует: ${selectedProduct || 'Общий заказ'}\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nСпособ связи: ${formData.contactMethod}\nНикнейм/Номер: ${formData.social || 'Не указан'}\nинтересуется: ${formData.question || 'Нет'}`;
    
    try {
      // Send to our backend API which will handle the Telegram message
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });
      
      if (!response.ok) {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
      setFormData({ name: '', phone: '', contactMethod: 'WhatsApp', social: '', question: '' });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-white font-sans selection:bg-red-600 selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col bg-[#030303]">
        {/* Background Image with Premium Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            style={{ y: scrollY * 0.4 }}
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1920&auto=format&fit=crop"
            alt="Оптовые поставки МТК"
            className="w-full h-full object-cover grayscale-[0.8] opacity-40 transform-gpu backface-hidden scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Dark luxury overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(209,32,32,0.08),transparent_60%)]"></div>
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        </div>

        {/* Header (Minimalist) */}
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-50 border-b border-white/5 bg-transparent transform-gpu will-change-[transform,opacity]"
        >
          <div className="w-full px-6 md:px-12 py-6 flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:border-red-600/50 transition-all duration-500">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase font-light hidden sm:block">На главную</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-12">
              {['Компания', 'Продукция', 'Контакты'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4 md:gap-10">
              <button 
                onClick={() => {
                  setSelectedProduct('Общий заказ');
                  setIsModalOpen(true);
                }}
                className="hidden sm:block px-8 py-3.5 bg-transparent border border-white/10 hover:border-white/30 text-white text-[10px] uppercase tracking-[0.3em] font-light rounded-full transition-all duration-500 hover:bg-white/5"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="relative z-10 w-full px-6 md:px-12 flex-1 flex flex-col justify-center items-center text-center pb-20 pt-10">
          
          <div className="max-w-6xl flex flex-col items-center relative z-10">
            {/* Premium Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 mb-12 transform-gpu will-change-[transform,opacity]"
            >
              <span className="text-[9px] md:text-[11px] font-light uppercase tracking-[0.5em] text-red-500">
                Махачкалинская топливная компания
              </span>
              <div className="h-[1px] w-12 bg-red-600/50"></div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.21, 0.45, 0.32, 0.9] }}
              className="text-[2.5rem] leading-[1.1] sm:text-6xl md:text-7xl lg:text-[6.5rem] font-light tracking-tight mb-8 md:mb-12 text-white drop-shadow-2xl transform-gpu will-change-[transform,opacity]"
            >
              Оптовые поставки <br />
              <span className="text-red-600 font-normal">нефтепродуктов</span> <br />
              по всей России
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="text-lg md:text-xl lg:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed mb-16 mx-auto px-4 tracking-wide transform-gpu will-change-[transform,opacity]"
            >
              Гарантированное качество, стабильные поставки и индивидуальные условия для каждого партнера. Мы обеспечиваем энергией ваш бизнес.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-4 sm:px-0 transform-gpu will-change-[transform,opacity]"
            >
              <a 
                href="#продукция"
                className="px-10 md:px-12 py-4 md:py-5 bg-red-600 hover:bg-red-700 text-white text-[11px] md:text-[12px] font-medium tracking-[0.2em] uppercase rounded-full transition-all duration-500 shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] w-full sm:w-fit text-center"
              >
                Виды продукции
              </a>
              <button 
                onClick={() => {
                  setSelectedProduct('Консультация');
                  setIsModalOpen(true);
                }}
                className="px-10 md:px-12 py-4 md:py-5 bg-transparent border border-white/20 hover:border-white/50 text-white text-[11px] md:text-[12px] font-medium tracking-[0.2em] uppercase rounded-full transition-all duration-500 hover:bg-white/5 w-full sm:w-fit"
              >
                Связаться с нами
              </button>
            </motion.div>
          </div>
        </main>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="компания" className="relative w-full bg-white py-24 md:py-32 px-6 md:px-12 z-20 rounded-t-[2.5rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24 transform-gpu will-change-opacity"
          >
            <span className="text-red-600 font-medium tracking-[0.2em] uppercase text-xs md:text-sm mb-6 block">О компании</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight leading-[1.2] max-w-5xl">
              Мы сотрудничаем с крупнейшими поставщиками в России. <span className="text-gray-400">Наши партнеры доверяют нам.</span>
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: "easeOut"
              }}
              className="bg-gray-50 rounded-[2rem] p-10 md:p-16 border border-gray-100 flex flex-col justify-center relative overflow-hidden group shadow-sm hover:shadow-xl transform-gpu will-change-[transform,opacity]"
            >
              <span className="text-6xl sm:text-7xl md:text-8xl font-light text-red-600 mb-4 tracking-tighter">
                50<span className="text-red-600/50 font-serif italic ml-2">&gt;</span>
              </span>
              <span className="text-sm md:text-base text-gray-900 font-medium uppercase tracking-widest">городов поставки</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: "easeOut"
              }}
              className="bg-gray-50 rounded-[2rem] p-10 md:p-16 border border-gray-100 flex flex-col justify-center relative overflow-hidden group shadow-sm hover:shadow-xl transform-gpu will-change-[transform,opacity]"
            >
              <span className="text-6xl sm:text-7xl md:text-8xl font-light text-gray-900 mb-4 tracking-tighter">8</span>
              <span className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-widest">различных поставщиков</span>
            </motion.div>
          </div>

          {/* Team Section (Editorial Split) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 1, 
              delay: 0.2,
              ease: "easeOut"
            }}
            className="border-t border-gray-200 pt-16 md:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 transform-gpu will-change-[transform,opacity]"
          >
            <div className="lg:col-span-5">
              <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">Команда МТК</h3>
              <p className="text-xl md:text-2xl text-red-600 font-light leading-relaxed">
                МТК сегодня — это молодая и стремительно развивающаяся торговая компания в области поставки нефти и нефтепродуктов
              </p>
            </div>
            <div className="lg:col-span-7 lg:pl-12 flex items-center">
              <p className="text-base md:text-lg lg:text-xl text-gray-600 font-light leading-relaxed">
                Первые продажи начались в 2018 году, а уже через год объем продаж увеличился, поскольку нашим клиентам мы предлагаем превосходное качество и сервис доставки по приемлемой цене, благодаря плодотворной работе наших специалистов в области нефтепереработки.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section id="продукция" className="relative w-full bg-gray-50 py-24 md:py-32 px-6 md:px-12 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16 md:mb-24 transform-gpu will-change-opacity"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 tracking-tight">Виды продукции</h2>
            <div className="h-[1px] w-12 bg-red-600/50 mt-8"></div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
            {[
              {
                id: 1,
                title: "Бензин АИ-92",
                desc: "— самая распространенная марка бензина в России. Высокооктановое топливо, предназначенное для двигателей карбюраторного типа"
              },
              {
                id: 2,
                title: "Бензин АИ-95",
                desc: "— премиальная марка топлива с улучшенными характеристиками. По сравнению с 92-м бензином содержит больше противодетонирующих присадок"
              },
              {
                id: 3,
                title: "Бензин АИ-100",
                desc: "— передовой вид топлива на российском рынке. Способен существенно снизить расход топлива. Каждые 100 километров удастся сэкономить 10%"
              },
              {
                id: 4,
                title: "ДТ Евро-5",
                desc: "— сделано согласно европейским стандартам и помогает увеличить срок службы двигателя, увеличивает его износостойкость и мощность"
              }
            ].map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm hover:shadow-xl cursor-default transform-gpu will-change-[transform,opacity]"
              >
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white text-xl font-light mb-8 shadow-[0_10px_20px_rgba(220,38,38,0.2)] group-hover:scale-110 transition-transform duration-500">
                  {product.id}
                </div>
                <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
                  <span className="text-gray-900 font-medium">{product.title}</span> {product.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Large Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group shadow-2xl transform-gpu will-change-opacity"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            <img 
              src="https://messages-prod.27c852f3500f38c1e7786e2c9ff9e48f.r2.cloudflarestorage.com/019d2523-7452-7244-af07-639ffd7a6715/1774867362387-019d3e56-8253-78d4-8e63-925fce3e86c3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=75514238966d6677c3874ef9149f1398%2F20260330%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260330T104242Z&X-Amz-Expires=3600&X-Amz-Signature=c136d3eb045124fecce640a327ce919497fe2d4c5af1033c223ead5c6faa6daa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject" 
              alt="Нефтедобывающая платформа" 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out rounded-[2rem] md:rounded-[3rem] transform-gpu backface-hidden"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* --- PRODUCT CARDS SECTION --- */}
      <section id="продукция-карточки" className="relative w-full bg-white py-24 md:py-32 px-6 md:px-12 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16 md:mb-24 transform-gpu will-change-opacity"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 tracking-tight">Продукция</h2>
            <div className="h-[1px] w-12 bg-red-600/50 mt-8"></div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { id: 'ai92', title: 'АИ-92', subtitle: 'Бензиновое топливо', type: 'red' },
              { id: 'ai95', title: 'АИ-95', subtitle: 'Бензиновое топливо', type: 'red' },
              { id: 'ai100', title: 'АИ-100', subtitle: 'Бензиновое топливо', type: 'red' },
              { id: 'dt', title: 'ДТ', subtitle: 'Дизельное топливо', type: 'red' },
              { id: 'prices', title: 'Цены', subtitle: 'Узнать текущие цены', type: 'gray' },
            ].map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              onClick={() => {
                setSelectedProduct(card.title);
                setIsModalOpen(true);
              }}
              className={`group relative overflow-hidden rounded-[2rem] p-8 md:p-10 cursor-pointer shadow-sm hover:shadow-2xl flex flex-col justify-between min-h-[280px] transform-gpu will-change-[transform,opacity] ${
                card.type === 'red' 
                  ? 'bg-[#D12020] text-white' 
                  : 'bg-[#F2F2F2] text-gray-900'
              }`}
            >
                <div className="flex flex-col h-full justify-end relative z-10">
                  <h3 className="text-4xl md:text-5xl font-light mb-2 tracking-tight">{card.title}</h3>
                  <p className={`text-sm md:text-base font-light ${card.type === 'red' ? 'text-white/80' : 'text-gray-500'}`}>
                    {card.subtitle}
                  </p>
                </div>

                {card.type === 'red' && (
                  <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#D12020] transform group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 shadow-lg">
                    <Plus className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                )}
                
                {/* Subtle gradient overlay for depth */}
                {card.type === 'red' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT FORM SECTION --- */}
      <section id="order-form" className="relative w-full bg-white pb-24 md:pb-32 px-6 md:px-12 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.005 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            className="w-full bg-[#F4F4F4] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch overflow-hidden relative shadow-sm transform-gpu will-change-[transform,opacity]"
          >
            {/* Left: Form Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 tracking-tight mb-6">
                Оставьте заявку
              </h2>
              <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed mb-10 max-w-md">
                Заполните форму, наш специалист свяжется с вами в течении 15 минут, чтобы обсудить все ваши пожелания
              </p>

              {isSuccess && !isModalOpen ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 max-w-md bg-white/50 backdrop-blur-sm rounded-[2rem] border border-gray-200"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-500 font-light text-sm">
                    Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <form className="space-y-5 max-w-md" onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ваше имя"
                    className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-light"
                  />
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Укажите свой номер телефона"
                    className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-light"
                  />
                  <textarea 
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                    placeholder="Напиши свой вопрос"
                    className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-light resize-none"
                    rows={3}
                  />
                  
                  <div className="space-y-3">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 ml-4 font-medium">Где удобней связаться?</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'WhatsApp', icon: MessageCircle },
                        { id: 'Telegram', icon: Send },
                        { id: 'Звонок', icon: PhoneCall }
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData({...formData, contactMethod: method.id})}
                          className={`flex flex-col items-center justify-center gap-2 py-3 border rounded-2xl transition-all ${
                            formData.contactMethod === method.id 
                              ? 'bg-red-600 border-red-600 text-white' 
                              : 'bg-transparent border-gray-800 text-gray-500 hover:border-gray-400'
                          }`}
                        >
                          <method.icon className="w-4 h-4" />
                          <span className="text-[8px] uppercase tracking-widest font-bold">{method.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full sm:w-auto bg-[#D12020] hover:bg-red-700 text-white rounded-2xl px-12 py-4 font-light tracking-wide transition-colors shadow-[0_10px_20px_rgba(209,32,32,0.2)] hover:shadow-[0_15px_30px_rgba(209,32,32,0.3)]"
                    >
                      Оставить заявку
                    </button>
                    <p className="mt-4 text-[10px] text-gray-400 leading-relaxed">
                      Нажимая кнопку, вы соглашаетесь с <Link to="/privacy" className="underline hover:text-gray-600">политикой конфиденциальности</Link>
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Image */}
            <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[400px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group transform-gpu">
              <img 
                src="https://messages-prod.27c852f3500f38c1e7786e2c9ff9e48f.r2.cloudflarestorage.com/019d2523-7452-7244-af07-639ffd7a6715/1774862229489-019d3e07-c84e-7c4d-bda6-683b44d5c6f5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=75514238966d6677c3874ef9149f1398%2F20260330%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260330T104207Z&X-Amz-Expires=3600&X-Amz-Signature=91ee64e8c6c5e21a7fbc1566d05ab6ccb4c11055a7ba7fad3956d100191458f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject" 
                alt="Бензовоз МТК" 
                className="absolute inset-0 w-full h-full object-cover object-right transform group-hover:scale-105 transition-transform duration-[2s] ease-out rounded-[1.5rem] md:rounded-[2rem] transform-gpu backface-hidden"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-500 font-light text-sm">
                    Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-light text-gray-900 mb-2">Оставить заявку</h3>
                    <p className="text-gray-500 font-light text-sm">
                      {selectedProduct === 'Цены' 
                        ? 'Оставьте свои данные, и мы вышлем вам актуальный прайс-лист.'
                        : `Оставьте свои данные для заказа: ${selectedProduct}.`}
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 ml-4">Ваше имя</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/50 transition-all font-light"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 ml-4">Телефон</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/50 transition-all font-light"
                        placeholder="+7 (999) 000-00-00"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 ml-4 font-medium">Где удобней связаться?</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'WhatsApp', icon: MessageCircle },
                          { id: 'Telegram', icon: Send },
                          { id: 'Звонок', icon: PhoneCall }
                        ].map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setFormData({...formData, contactMethod: method.id})}
                            className={`flex flex-col items-center justify-center gap-2 py-3 border rounded-2xl transition-all ${
                              formData.contactMethod === method.id 
                                ? 'bg-red-600 border-red-600 text-white' 
                                : 'bg-transparent border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                          >
                            <method.icon className="w-4 h-4" />
                            <span className="text-[8px] uppercase tracking-widest font-bold">{method.id}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-[#D12020] hover:bg-red-700 text-white rounded-2xl py-4 mt-4 font-light tracking-wide transition-colors shadow-[0_10px_20px_rgba(209,32,32,0.2)] hover:shadow-[0_15px_30px_rgba(209,32,32,0.3)]"
                    >
                      Отправить заявку
                    </button>
                    
                    <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed">
                      Нажимая кнопку, вы соглашаетесь с <br/>
                      <Link to="/privacy" className="underline hover:text-gray-600">политикой конфиденциальности</Link>
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="relative w-full bg-[#D12020] text-white py-16 md:py-24 px-6 md:px-12 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Footer Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">Контакты</h2>
          </motion.div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Column 1: Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col space-y-6"
            >
              <h3 className="text-lg md:text-xl font-normal mb-2">Навигация по сайту</h3>
              <ul className="flex flex-col space-y-4 font-light text-white/90">
                <li><a href="#компания" className="hover:text-white hover:translate-x-1 transition-all inline-block">О компании</a></li>
                <li><a href="#продукция" className="hover:text-white hover:translate-x-1 transition-all inline-block">Виды продукции</a></li>
                <li><a href="#продукция-карточки" className="hover:text-white hover:translate-x-1 transition-all inline-block">Продукция</a></li>
                <li><a href="#order-form" className="hover:text-white hover:translate-x-1 transition-all inline-block">Оставить заявку</a></li>
              </ul>
            </motion.div>

            {/* Column 2: About Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col space-y-6"
            >
              <h3 className="text-lg md:text-xl font-normal mb-2">О нас</h3>
              <ul className="flex flex-col space-y-4 font-light text-white/90">
                <li className="leading-relaxed">г. Махачкала, ул. Генерала Омарова 1Б</li>
                <li><a href="mailto:mtkazs@gmail.com" className="hover:text-white transition-colors">mtkazs@gmail.com</a></li>
              </ul>
            </motion.div>

            {/* Column 3: Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col space-y-6"
            >
              <h3 className="text-lg md:text-xl font-normal mb-2">Информация</h3>
              <ul className="flex flex-col space-y-4 font-light text-white/90">
                <li><Link to="/privacy" className="hover:text-white transition-colors leading-relaxed inline-block">Политика обработки<br/>персональных данных</Link></li>
                <li className="text-[10px] uppercase tracking-widest opacity-60 mt-4">
                  ИНН: 0000000000<br/>
                  ОГРН: 0000000000000
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
