import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle, Mail } from 'lucide-react';

interface ContactProps {
  currentLang: string;
}

const Contact: React.FC<ContactProps> = ({ currentLang }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    language: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    uz: {
      title: "Biz bilan bog'laning",
      subtitle: "Savollaringiz bormi? Biz sizga yordam berishga tayyormiz!",
      form: {
        name: "Ismingiz",
        phone: "Telefon raqamingiz",
        language: "Qaysi tilni o'rganmoqchisiz?",
        message: "Xabaringiz",
        submit: "Xabar yuborish",
        success: "Xabaringiz yuborildi!"
      },
      languages: {
        arabic: "Arab tili",
        english: "Ingliz tili",
        russian: "Rus tili"
      },
      contact: {
        phone: "Telefon",
        telegram: "Telegram",
        address: "Manzil",
        hours: "Ish vaqti"
      },
      address: "Toshkent viloyati, Choshtepa tumani, DAN Yunus-Obod, IQBOL do'konlari yonida, 2-qavat",
      hours: "Dushanba - Shanba: 9:00 - 18:00"
    },
    ru: {
      title: "Свяжитесь с нами",
      subtitle: "Есть вопросы? Мы готовы помочь вам!",
      form: {
        name: "Ваше имя",
        phone: "Ваш телефон",
        language: "Какой язык хотите изучать?",
        message: "Ваше сообщение",
        submit: "Отправить сообщение",
        success: "Ваше сообщение отправлено!"
      },
      languages: {
        arabic: "Арабский язык",
        english: "Английский язык",
        russian: "Русский язык"
      },
      contact: {
        phone: "Телефон",
        telegram: "Telegram",
        address: "Адрес",
        hours: "Рабочие часы"
      },
      address: "Ташкентская область, Чуштепа, рядом с DAN Юнус-Обод, магазины IQBOL, 2-й этаж",
      hours: "Понедельник - Суббота: 9:00 - 18:00"
    },
    en: {
      title: "Contact Us",
      subtitle: "Have questions? We're ready to help you!",
      form: {
        name: "Your Name",
        phone: "Your Phone",
        language: "Which language do you want to learn?",
        message: "Your Message",
        submit: "Send Message",
        success: "Your message has been sent!"
      },
      languages: {
        arabic: "Arabic Language",
        english: "English Language",
        russian: "Russian Language"
      },
      contact: {
        phone: "Phone",
        telegram: "Telegram",
        address: "Address",
        hours: "Working Hours"
      },
      address: "Tashkent Region, Choshtepa, near DAN Yunus-Obod, IQBOL stores, 2nd floor",
      hours: "Monday - Saturday: 9:00 - 18:00"
    }
  };

  const currentContent = content[currentLang as keyof typeof content];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', language: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {currentContent.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentContent.contact.phone}</h3>
                <div className="space-y-1 text-gray-600">
                  <a href="tel:+998883309525" className="block hover:text-green-600 transition-colors">
                    +998 88 330 95 25
                  </a>
                  <a href="tel:+998555209525" className="block hover:text-green-600 transition-colors">
                    +998 55 520 95 25
                  </a>
                  <a href="tel:+998712209525" className="block hover:text-green-600 transition-colors">
                    +998 71 220 95 25
                  </a>
                </div>
              </div>

              {/* Telegram */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentContent.contact.telegram}</h3>
                <a 
                  href="https://t.me/Almisbah_admin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  @Almisbah_admin
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentContent.contact.address}</h3>
                  <p className="text-gray-600 leading-relaxed">{currentContent.address}</p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentContent.contact.hours}</h3>
                  <p className="text-gray-600">{currentContent.hours}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {currentLang === 'uz' ? 'Bizning joylashuvimiz' : 
                 currentLang === 'ru' ? 'Наше местоположение' : 'Our Location'}
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.8234567890123!2d69.3243516!3d41.3683135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef370b7e24aa1%3A0x786dd7bd105ae1c1!2sAl%20Misbah!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Al-Misbah Learning Centre Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {currentLang === 'uz' ? 'Bizga xabar yuboring' : 
               currentLang === 'ru' ? 'Отправьте нам сообщение' : 'Send us a message'}
            </h3>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-green-600 mb-2">
                  {currentContent.form.success}
                </h4>
                <p className="text-gray-600">
                  {currentLang === 'uz' ? 'Tez orada siz bilan bog\'lanamiz' : 
                   currentLang === 'ru' ? 'Мы свяжемся с вами в ближайшее время' : 'We will contact you soon'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.form.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder={currentContent.form.name}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.form.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="+998 XX XXX XX XX"
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.form.language}
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">
                      {currentLang === 'uz' ? 'Tilni tanlang' : 
                       currentLang === 'ru' ? 'Выберите язык' : 'Select language'}
                    </option>
                    <option value="arabic">{currentContent.languages.arabic}</option>
                    <option value="english">{currentContent.languages.english}</option>
                    <option value="russian">{currentContent.languages.russian}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.form.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={currentContent.form.message}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>
                        {currentLang === 'uz' ? 'Yuborilmoqda...' : 
                         currentLang === 'ru' ? 'Отправляется...' : 'Sending...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{currentContent.form.submit}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;