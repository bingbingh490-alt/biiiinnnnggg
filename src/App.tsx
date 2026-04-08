import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Plus, 
  Home, 
  User as UserIcon, 
  ChevronRight, 
  MapPin, 
  BookOpen, 
  Users, 
  Bell, 
  Heart,
  Shield,
  Activity,
  Smartphone,
  ClipboardList,
  Stethoscope,
  ArrowLeft,
  Send,
  MoreHorizontal,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Video,
  Mic,
  Camera,
  Image as ImageIcon,
  Map as MapIcon,
  Navigation,
  Info,
  Settings,
  Lock,
  EyeOff,
  UserCheck,
  LogOut,
  Download,
  Table,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---
type Tab = 'home' | 'medical' | 'community' | 'profile';
type View = 'main' | 'consultation' | 'reports' | 'report_detail' | 'devices' | 'device_connect' | 'indicator_detail' | 'indicator_record' | 'aed_map' | 'medical_map' | 'medical_path' | 'medication_management' | 'event_detail' | 'guide_detail' | 'indicator_history_detail' | 'service_detail' | 'health_score_detail' | 'emergency_contacts' | 'medication_add' | 'video_player' | 'notice_detail' | 'search_results' | 'settings' | 'privacy_security' | 'medical_history' | 'allergy_history' | 'physical_exam_reports' | 'physical_exam_record' | 'emergency' | 'edit_profile' | 'login';

interface Message {
  id: number;
  text: string;
  sender: 'doctor' | 'user';
  time: string;
}

// --- Components ---

const EmergencyCountdown = () => {
  const [countdown, setCountdown] = useState(5);
  const [isCalling, setIsCalling] = useState(false);
  
  useEffect(() => {
    if (countdown <= 0) {
      setIsCalling(true);
      window.location.href = 'tel:120';
      return;
    }
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.5 }} 
        animate={{ scale: 1 }} 
        className={cn(
          "w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-2xl transition-colors duration-500",
          isCalling ? "bg-green-500" : "bg-white"
        )}
      >
        {isCalling ? (
          <Phone className="w-16 h-16 text-white animate-bounce" />
        ) : (
          <AlertCircle className="w-16 h-16 text-design-sos animate-pulse" />
        )}
      </motion.div>
      
      <h1 className="text-4xl font-black mb-4">{isCalling ? "正在呼叫 120" : "紧急呼救中"}</h1>
      <p className="text-xl mb-8 opacity-90">{isCalling ? "请保持电话畅通，救援人员正在赶来" : "正在为您呼叫最近的急救中心..."}</p>
      
      {!isCalling && (
        <>
          <div className="text-7xl font-black mb-4 tabular-nums">{countdown}s</div>
          <p className="text-sm opacity-70 mb-8">倒计时结束将自动拨打 120</p>
        </>
      )}
      
      {isCalling && (
        <div className="flex gap-4 mb-8">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
        </div>
      )}
    </div>
  );
};

const NavBar = ({ activeTab, setActiveTab, onSosTrigger }: { activeTab: Tab, setActiveTab: (tab: Tab) => void, onSosTrigger: () => void }) => (
  <nav className="nav-bar">
    <button onClick={() => setActiveTab('home')} className={cn("nav-icon", activeTab === 'home' && "active")}>
      <Home className="w-6 h-6" />
      <span className="text-[10px] font-bold">首页</span>
    </button>
    <button onClick={() => setActiveTab('medical')} className={cn("nav-icon", activeTab === 'medical' && "active")}>
      <Stethoscope className="w-6 h-6" />
      <span className="text-[10px] font-bold">医疗指导</span>
    </button>
    
    <div className="flex flex-col items-center justify-center gap-1 w-16 h-full">
      <button onClick={onSosTrigger} className="nav-icon-sos">
        SOS
      </button>
      <span className="text-[10px] font-bold text-white">紧急呼救</span>
    </div>

    <button onClick={() => setActiveTab('community')} className={cn("nav-icon", activeTab === 'community' && "active")}>
      <Users className="w-6 h-6" />
      <span className="text-[10px] font-bold">社区</span>
    </button>
    <button onClick={() => setActiveTab('profile')} className={cn("nav-icon", activeTab === 'profile' && "active")}>
      <UserIcon className="w-6 h-6" />
      <span className="text-[10px] font-bold">我的</span>
    </button>
  </nav>
);

const SubPageHeader = ({ title, onBack, rightElement }: { title: string, onBack: () => void, rightElement?: React.ReactNode }) => (
  <div className="bg-white p-4 flex items-center justify-between sticky top-0 z-[70] border-b border-purple-50">
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="p-2 hover:bg-purple-50 rounded-full transition-colors">
        <ArrowLeft className="w-6 h-6 text-design-purple" />
      </button>
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
    {rightElement}
  </div>
);

const SOSButton = ({ onTrigger }: { onTrigger: () => void }) => {
  return (
    <div 
      className="relative cursor-pointer active:scale-95 transition-transform"
      onClick={onTrigger}
    >
      <div className="sos-circle">
        SOS
      </div>
    </div>
  );
};

const ExportModal = ({ isOpen, onClose, type }: { isOpen: boolean, onClose: () => void, type: string }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-sm rounded-[32px] p-6 relative z-10 space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto text-design-purple">
              <Download className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-800">导出健康数据</h3>
            <p className="text-sm text-slate-500">请选择您想要导出的 {type} 数据格式</p>
          </div>

          <div className="space-y-3">
            {[
              { name: 'PDF 报告', desc: '适合打印或发送给医生', icon: FileText, color: 'text-red-500', bg: 'bg-red-50' },
              { name: 'Excel 表格', desc: '适合进行数据分析', icon: Table, color: 'text-green-500', bg: 'bg-green-50' },
              { name: '图片长图', desc: '适合在社交软件分享', icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
            ].map((item, i) => (
              <button 
                key={i}
                onClick={() => {
                  alert(`正在生成 ${item.name}...`);
                  setTimeout(() => {
                    onClose();
                    alert('导出成功！已保存至本地。');
                  }, 1500);
                }}
                className="w-full design-card p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", item.bg, item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            ))}
          </div>

          <button onClick={onClose} className="w-full py-2 text-slate-400 font-bold text-sm active:scale-95 transition-transform">取消</button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- Main Application ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: '张大伯',
    phone: '138****8888',
    address: 'xx市xx区xxx街道',
    avatar: 'https://picsum.photos/seed/avatar/200/200'
  });
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [currentView, setCurrentView] = useState<View>('main');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "您好，我是值班医生。请问有什么可以帮您？", sender: 'doctor', time: '10:00' }
  ]);
  const [inputText, setInputText] = useState("");
  const [recordValue, setRecordValue] = useState(85);
  const [healthScore, setHealthScore] = useState(85);
  const [healthRecords, setHealthRecords] = useState({
    heartRate: [72, 75, 80, 85, 82, 78, 85],
    bloodPressure: ['120/80', '118/78', '122/82', '120/80', '115/75', '121/81', '120/80'],
    steps: [5432, 6543, 4321, 7654, 8765, 5432, 6432]
  });
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [selectedMedical, setSelectedMedical] = useState<any>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedIndicatorType, setSelectedIndicatorType] = useState('心率');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reminders, setReminders] = useState([
    { id: 1, time: '08:30', name: '阿司匹林', status: 'taken' },
    { id: 2, time: '12:30', name: '维生素C', status: 'pending' },
    { id: 3, time: '20:00', name: '降压药', status: 'pending' },
  ]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText("");
    
    // Auto reply
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: "收到您的信息，正在为您分析数据，请稍候...",
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-24">
            <div className="p-4 space-y-6">
              {/* Search Bar */}
              <div className="search-bar" onClick={() => setCurrentView('search_results')}>
                <Search className="w-5 h-5" />
                <input 
                  type="text" 
                  readOnly
                  placeholder="搜索急救知识、医生、社区服务..." 
                  className="bg-transparent border-none outline-none w-full text-sm text-slate-600 placeholder:text-purple-300 cursor-pointer" 
                />
              </div>

              {/* Health Summary Card */}
              <div className="design-card bg-gradient-to-br from-design-purple to-purple-600 text-white p-5 relative overflow-hidden cursor-pointer" onClick={() => setCurrentView('health_score_detail')}>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs opacity-80">今日健康评分</p>
                      <h3 className="text-4xl font-black">{healthScore}</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold">
                      状态：良好
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-2">
                      <p className="text-[8px] opacity-70">心率</p>
                      <p className="text-sm font-bold">85 <span className="text-[8px] font-normal">bpm</span></p>
                    </div>
                    <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-2">
                      <p className="text-[8px] opacity-70">血压</p>
                      <p className="text-sm font-bold">120/80 <span className="text-[8px] font-normal">mmHg</span></p>
                    </div>
                    <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-2">
                      <p className="text-[8px] opacity-70">步数</p>
                      <p className="text-sm font-bold">6,432 <span className="text-[8px] font-normal">步</span></p>
                    </div>
                  </div>
                </div>
                <Activity className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 rotate-12" />
              </div>

              {/* Main Actions */}
              <div className="flex justify-around items-end py-2">
                <div className="action-circle" onClick={() => setCurrentView('indicator_detail')}>
                  <div className="action-icon-wrapper">
                    <Activity className="w-10 h-10 text-design-purple" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">健康监测</span>
                </div>
                
                <div className="action-circle" onClick={() => setCurrentView('emergency')}>
                  <div className="w-20 h-20 rounded-full bg-design-sos flex items-center justify-center shadow-lg shadow-red-200 transition-transform active:scale-95">
                    <span className="text-white font-black text-2xl">SOS</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">紧急呼救</span>
                </div>

                <div className="action-circle" onClick={() => setActiveTab('medical')}>
                  <div className="action-icon-wrapper">
                    <Stethoscope className="w-10 h-10 text-design-purple" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">医疗指导</span>
                </div>
              </div>

              {/* Medical & Allergy History */}
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setCurrentView('medical_history')} className="design-card p-4 bg-orange-50 border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList className="w-4 h-4 text-orange-500" />
                    <h3 className="text-sm font-bold text-slate-800">既往病史</h3>
                  </div>
                  <p className="text-[10px] text-slate-500">高血压、糖尿病...</p>
                </div>
                <div onClick={() => setCurrentView('allergy_history')} className="design-card p-4 bg-red-50 border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    <h3 className="text-sm font-bold text-slate-800">过敏史</h3>
                  </div>
                  <p className="text-[10px] text-slate-500">青霉素、花粉...</p>
                </div>
              </div>

              {/* Quick Services Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setCurrentView('consultation')} className="design-card flex items-center gap-3 p-4 bg-purple-50 border-purple-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Stethoscope className="w-6 h-6 text-design-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">在线问诊</p>
                    <p className="text-[10px] text-slate-400">专业医生在线</p>
                  </div>
                </div>
                <div onClick={() => setCurrentView('reports')} className="design-card flex items-center gap-3 p-4 bg-blue-50 border-blue-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <ClipboardList className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">就医资料</p>
                    <p className="text-[10px] text-slate-400">病历与报告</p>
                  </div>
                </div>
              </div>

              {/* Medication Reminders Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-800">今日用药</h2>
                  <button onClick={() => setCurrentView('medication_management')} className="text-xs text-design-purple font-bold">管理 &gt;</button>
                </div>
                <div className="design-card p-4 space-y-3">
                  {reminders.slice(0, 2).map(reminder => (
                    <div key={reminder.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", reminder.status === 'taken' ? "bg-green-50" : "bg-purple-50")}>
                          <ClipboardList className={cn("w-5 h-5", reminder.status === 'taken' ? "text-green-500" : "text-design-purple")} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{reminder.name}</p>
                          <p className="text-[10px] text-slate-400">{reminder.time}</p>
                        </div>
                      </div>
                      <button className={cn(
                        "text-[10px] font-bold px-4 py-2 rounded-xl",
                        reminder.status === 'taken' ? "bg-green-100 text-green-600" : "bg-design-purple text-white"
                      )}>
                        {reminder.status === 'taken' ? '已服用' : '确认'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Knowledge Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-800">急救百科</h2>
                  <button onClick={() => setActiveTab('emergency')} className="text-xs text-design-purple font-bold">查看全部 &gt;</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {[
                    { 
                      id: 'burn', 
                      title: '烧伤烫伤', 
                      img: 'burn', 
                      color: 'bg-orange-500',
                      tag: '急救',
                      target: '通用',
                      icon: Activity,
                      videoTitle: '烧伤烫伤急救视频教学',
                      steps: [
                        { step: '01', title: '冲', desc: '用流动清水冲洗伤口15-30分钟，直到疼痛明显减轻。' },
                        { step: '02', title: '脱', desc: '在水中小心脱去衣物，如衣物粘连，切勿强行撕扯。' },
                        { step: '03', title: '泡', desc: '将伤处浸泡在冷水中，进一步降温。' },
                        { step: '04', title: '盖', desc: '用干净的纱布或布料覆盖伤口，切勿涂抹药膏或牙膏。' },
                      ],
                      tips: ['不要弄破水泡，以免感染。', '不要使用冰块直接冰敷，以免冻伤。', '严重烧伤请立即就医。']
                    },
                    { 
                      id: 'bone', 
                      title: '骨折处理', 
                      img: 'bone', 
                      color: 'bg-blue-500',
                      tag: '急救',
                      target: '通用',
                      icon: Activity,
                      videoTitle: '骨折固定与急救视频教学',
                      steps: [
                        { step: '01', title: '固定伤处', desc: '避免移动受伤部位，防止二次伤害。' },
                        { step: '02', title: '止血处理', desc: '如有开放性伤口，先进行止血并覆盖。' },
                        { step: '03', title: '寻找支架', desc: '使用木板、树枝或硬纸板作为临时夹板。' },
                        { step: '04', title: '包扎固定', desc: '用布条或绷带将夹板固定在伤处两端。' },
                      ],
                      tips: ['不要尝试将骨头复位。', '固定时不要过紧，以免影响血液循环。', '观察肢体远端颜色和温度。']
                    },
                    { 
                      id: 'cpr', 
                      title: '心肺复苏', 
                      img: 'cpr', 
                      color: 'bg-red-500',
                      tag: '紧急',
                      target: '成人',
                      icon: Heart,
                      steps: [
                        { step: '01', title: '确认环境安全', desc: '在施救前，首先确保现场环境对施救者和伤病员都是安全的。' },
                        { step: '02', title: '判断意识与呼吸', desc: '轻拍双肩，大声呼唤。观察胸部有无起伏，判断时间不超过10秒。' },
                        { step: '03', title: '呼救并获取AED', desc: '大声呼救，指定专人拨打120，并寻找附近的AED设备。' },
                        { step: '04', title: '胸外按压', desc: '按压部位：胸骨下半部。按压频率：100-120次/分。按压幅度：5-6厘米。' },
                      ],
                      tips: ['按压过程中手臂应垂直，不可弯曲。', '每次按压后应让胸廓充分回弹，但手掌不离开胸壁。', '尽量减少按压中断，中断时间不应超过10秒。']
                    },
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => {
                        setSelectedGuide(item);
                        setCurrentView('guide_detail');
                      }} 
                      className="shrink-0 w-40 design-card p-0 overflow-hidden cursor-pointer active:scale-95 transition-transform"
                    >
                      <img src={`https://picsum.photos/seed/${item.img}/300/200`} className="w-full h-24 object-cover" alt={item.title} referrerPolicy="no-referrer" />
                      <div className="p-3">
                        <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">急救指南</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'community':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-24">
            <div className="p-4 space-y-6">
              {/* Community Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-800">社区服务</h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-purple-100 rounded-full text-design-purple"><Bell className="w-5 h-5" /></button>
                  <button className="p-2 bg-purple-100 rounded-full text-design-purple"><Users className="w-5 h-5" /></button>
                </div>
              </div>

              {/* Community Notice */}
              <div className="design-card bg-blue-50 border-blue-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                  <h3 className="text-blue-600 font-bold text-sm">重要通知</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  因突发电力故障，小区 3号楼、5号楼 预计停电2小时。请家中使用呼吸机等设备的居民注意！
                </p>
                <div className="mt-3 flex justify-end">
                  <button onClick={() => setCurrentView('notice_detail')} className="text-[10px] font-bold text-blue-600">查看详情 &gt;</button>
                </div>
              </div>

              {/* Service Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Users, label: '志愿者', color: 'text-purple-500', details: ['志愿者招募', '服务时长记录', '优秀志愿者展示', '志愿者培训'] },
                  { icon: Heart, label: '邻里互助', color: 'text-red-500', details: ['互助信息发布', '邻里借用', '顺风车服务', '技能交换'] },
                  { icon: BookOpen, label: '老年大学', color: 'text-blue-500', details: ['课程列表', '我的课表', '学习资料下载', '线上课堂'] },
                  { icon: MapPin, label: '周边设施', color: 'text-green-500', details: ['社区公园', '便利店', '理发店', '银行网点'] },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col items-center gap-2 cursor-pointer" 
                    onClick={() => {
                      setSelectedService({
                        title: item.label,
                        desc: `社区${item.label}相关服务`,
                        icon: item.icon,
                        details: item.details
                      });
                      setCurrentView('service_detail');
                    }}
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-purple-50">
                      <item.icon className={cn("w-7 h-7", item.color)} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Volunteer Services */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">志愿者服务</h3>
                  <button className="text-xs text-design-purple font-bold">预约服务 &gt;</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: '代买代办', desc: '买菜、取药、缴费', icon: ClipboardList, color: 'bg-purple-50 text-purple-500', details: ['买菜、取快递', '代取药品', '代缴水电费', '代办社区事务'] },
                    { title: '助餐服务', desc: '社区食堂送餐上门', icon: Heart, color: 'bg-red-50 text-red-500', details: ['社区食堂送餐', '营养配餐建议', '协助进餐', '餐后清理'] },
                    { title: '助浴助洁', desc: '专业人员上门服务', icon: UserCheck, color: 'bg-blue-50 text-blue-500', details: ['协助洗浴', '居家环境清洁', '衣物洗涤', '床上用品更换'] },
                    { title: '心理慰藉', desc: '志愿者上门陪聊', icon: Users, color: 'bg-green-50 text-green-500', details: ['陪同聊天', '读书读报', '心理疏导', '社交活动协助'] },
                  ].map((service, i) => (
                    <div 
                      key={i} 
                      className="design-card p-4 flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform"
                      onClick={() => {
                        setSelectedService(service);
                        setCurrentView('service_detail');
                      }}
                    >
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", service.color)}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-sm text-slate-800">{service.title}</h4>
                      <p className="text-[10px] text-slate-400">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Events */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800">社区活动</h3>
                <div className="space-y-3">
                  {[
                    { title: '周末义诊活动', time: '本周六 09:00', location: '社区广场', img: 'clinic' },
                    { title: '急救知识讲座', time: '下周一 14:00', location: '居委会二楼', img: 'lecture' },
                  ].map((event, idx) => (
                    <div key={idx} onClick={() => setCurrentView('event_detail')} className="design-card flex gap-4 p-3 cursor-pointer">
                      <img src={`https://picsum.photos/seed/${event.img}/200/200`} className="w-20 h-20 rounded-xl object-cover" alt={event.title} referrerPolicy="no-referrer" />
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{event.title}</h4>
                          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</p>
                          <button className="bg-design-purple text-white text-[10px] font-bold px-3 py-1 rounded-full">报名</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'medical':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-24">
            <div className="p-4 space-y-6">
              {/* Medical Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-800">医疗与指导</h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-purple-100 rounded-full text-design-purple"><Bell className="w-5 h-5" /></button>
                </div>
              </div>

              {/* Doctor Consultation Card */}
              <div onClick={() => setCurrentView('consultation')} className="design-card bg-gradient-to-br from-design-purple to-purple-600 text-white p-5 relative overflow-hidden cursor-pointer">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">在线问诊</h3>
                  <p className="text-xs opacity-80 mb-4">7*24小时 专业医生在线解答</p>
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" alt="doctor" referrerPolicy="no-referrer" />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[10px] font-bold">+15</div>
                  </div>
                </div>
                <Stethoscope className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
              </div>

              {/* Quick Medical Actions */}
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setCurrentView('reports')} className="design-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">体检报告</span>
                </div>
                <div onClick={() => setCurrentView('medication_management')} className="design-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-orange-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">用药指导</span>
                </div>
              </div>

              {/* Emergency Section */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800">紧急救助</h3>
                <div className="flex items-center justify-between gap-4">
                  <div onClick={() => setCurrentView('aed_map')} className="flex-1 h-28 bg-white border border-purple-100 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all">
                    <MapIcon className="w-6 h-6 text-design-purple" />
                    <span className="text-[10px] font-bold text-slate-700">AED地图</span>
                  </div>
                  <SOSButton onTrigger={() => setCurrentView('emergency')} />
                  <div onClick={() => setCurrentView('emergency_contacts')} className="flex-1 h-28 bg-white border border-blue-100 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all">
                    <Phone className="w-6 h-6 text-blue-500" />
                    <span className="text-[10px] font-bold text-slate-700">紧急电话</span>
                  </div>
                </div>
              </div>

              {/* Nearby Medical Services */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">周边医疗</h3>
                  <button onClick={() => setCurrentView('medical_map')} className="text-xs text-design-purple font-bold">查看更多 &gt;</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'xx区中心医院', distance: '1.2km', type: '三甲医院', status: '营业中' },
                    { name: 'xx社区卫生服务中心', distance: '450m', type: '社区医疗', status: '营业中' },
                    { name: 'xx大药房 (24h)', distance: '300m', type: '药店', status: '24小时' },
                  ].map((item, i) => (
                    <div key={i} className="design-card flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{item.name}</h4>
                          <p className="text-[10px] text-slate-400">{item.type} · {item.distance}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-green-500 font-bold">{item.status}</span>
                        <div className="flex gap-2 mt-1">
                          <button onClick={() => window.location.href = 'tel:010-12345678'} className="p-1 text-design-purple active:scale-90 transition-transform"><Phone className="w-4 h-4" /></button>
                          <button 
                            onClick={() => {
                              setSelectedMedical(item);
                              setCurrentView('medical_path');
                            }} 
                            className="p-1 text-design-purple active:scale-90 transition-transform"
                          >
                            <Navigation className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Knowledge */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800">健康指导</h3>
                <div className="space-y-3">
                  {[
                    { 
                      title: '老年人春季养生指南', 
                      category: '养生', 
                      views: '1.2k',
                      tag: '科普',
                      target: '老年人',
                      icon: BookOpen,
                      steps: [
                        { step: '01', title: '饮食调理', desc: '多吃新鲜蔬菜水果，少吃油腻辛辣食物。' },
                        { step: '02', title: '适量运动', desc: '早晨或傍晚进行散步、太极拳等轻度运动。' },
                        { step: '03', title: '规律作息', desc: '保证充足睡眠，早睡早起。' },
                        { step: '04', title: '心情舒畅', desc: '保持乐观心态，多参加社区活动。' },
                      ],
                      tips: ['注意保暖，预防感冒。', '定期体检，关注身体变化。']
                    },
                    { 
                      title: '高血压患者饮食禁忌', 
                      category: '科普', 
                      views: '3.5k',
                      tag: '重点',
                      target: '高血压患者',
                      icon: Activity,
                      steps: [
                        { step: '01', title: '低盐饮食', desc: '每日食盐摄入量不超过6克。' },
                        { step: '02', title: '控制体重', desc: '合理膳食，维持健康体重。' },
                        { step: '03', title: '戒烟限酒', desc: '减少对血管的刺激。' },
                        { step: '04', title: '多吃高钾食物', desc: '如香蕉、菠菜等，有助于降压。' },
                      ],
                      tips: ['避免情绪激动。', '遵医嘱按时服药。']
                    },
                    { 
                      title: '居家适老化改造建议', 
                      category: '生活', 
                      views: '890',
                      tag: '建议',
                      target: '家属',
                      icon: Home,
                      steps: [
                        { step: '01', title: '地面防滑', desc: '浴室、厨房铺设防滑垫。' },
                        { step: '02', title: '安装扶手', desc: '马桶旁、淋浴间安装助力扶手。' },
                        { step: '03', title: '改善照明', desc: '增加夜灯，确保走廊明亮。' },
                        { step: '04', title: '消除门槛', desc: '减少地面高差，防止绊倒。' },
                      ],
                      tips: ['家具摆放要稳固。', '常用物品放在易拿取的位置。']
                    },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        setSelectedGuide(item);
                        setCurrentView('guide_detail');
                      }} 
                      className="design-card flex items-center justify-between p-4 cursor-pointer active:scale-95 transition-transform"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-design-purple rounded-full"></div>
                        <span className="text-sm font-bold text-slate-700">{item.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{item.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'profile':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-24">
            <div className="p-4 space-y-6">
              {/* User Header */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-purple-100 rounded-full border-4 border-white shadow-md overflow-hidden shrink-0">
                  <img src={userProfile.avatar} className="w-full h-full object-cover" alt="avatar" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{userProfile.name}</h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {userProfile.address}</p>
                </div>
              </div>

              {/* Health Score & Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="design-card flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-purple-50 cursor-pointer" onClick={() => setCurrentView('health_score_detail')}>
                  <div className="relative w-20 h-20 mb-3">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#f3e8ff" strokeWidth="6" />
                      <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#7c52a5" strokeWidth="6" strokeDasharray="251" strokeDashoffset={251 - (251 * healthScore) / 100} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-black text-design-purple">{healthScore}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">健康评分</span>
                </div>
                <div className="space-y-4">
                  <div className="design-card p-3 flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('indicator_detail')}>
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center"><Heart className="w-4 h-4 text-red-500" /></div>
                    <div>
                      <p className="text-[10px] text-slate-400">心率</p>
                      <p className="text-sm font-bold">85 bpm</p>
                    </div>
                  </div>
                  <div className="design-card p-3 flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('indicator_detail')}>
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"><Activity className="w-4 h-4 text-blue-500" /></div>
                    <div>
                      <p className="text-[10px] text-slate-400">血压</p>
                      <p className="text-sm font-bold">120/80</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medication Reminders */}
              <div className="design-card cursor-pointer" onClick={() => setCurrentView('medication_management')}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><Clock className="w-4 h-4 text-design-purple" /> 用药提醒</h3>
                  <button className="text-[10px] font-bold text-design-purple">管理 &gt;</button>
                </div>
                <div className="space-y-3">
                  {reminders.map(reminder => (
                    <div key={reminder.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full", reminder.status === 'taken' ? "bg-green-500" : "bg-orange-500")}></div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">{reminder.name}</p>
                          <p className="text-[10px] text-slate-400">{reminder.time}</p>
                        </div>
                      </div>
                      <button className={cn(
                        "text-[10px] font-bold px-3 py-1 rounded-full",
                        reminder.status === 'taken' ? "bg-green-100 text-green-600" : "bg-design-purple text-white"
                      )}>
                        {reminder.status === 'taken' ? '已服用' : '确认服用'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setCurrentView('reports')} className="design-card flex items-center gap-3 p-4 cursor-pointer">
                  <FileText className="w-5 h-5 text-design-purple" />
                  <span className="text-sm font-bold text-slate-700">就医资料</span>
                </div>
                <div onClick={() => setCurrentView('devices')} className="design-card flex items-center gap-3 p-4 cursor-pointer">
                  <Smartphone className="w-5 h-5 text-design-purple" />
                  <span className="text-sm font-bold text-slate-700">我的设备</span>
                </div>
              </div>

              {/* Settings & Privacy Section */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 px-1">账户与设置</h3>
                <div className="design-card p-0 overflow-hidden">
                  <div 
                    onClick={() => setCurrentView('edit_profile')}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-design-purple" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">编辑个人信息</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                  <div 
                    onClick={() => setCurrentView('settings')}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                        <Settings className="w-4 h-4 text-design-purple" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">设置与隐私</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                  <div 
                    onClick={() => setCurrentView('privacy_security')}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">隐私与安全</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="w-full py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>退出登录</span>
              </button>
            </div>
          </motion.div>
        );
    }
  };

  const renderSubPage = () => {
    switch (currentView) {
      case 'emergency':
        return (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 max-w-6xl mx-auto bg-design-sos z-[100] flex flex-col overflow-y-auto"
          >
            <div className="p-6 flex flex-col items-center text-white text-center">
              <div className="w-full flex justify-end mb-4">
                <button 
                  onClick={() => setCurrentView('main')}
                  className="p-2 bg-white/20 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <EmergencyCountdown />
              
              <div className="w-full space-y-6 mt-8">
                <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 text-left">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" /> 当前位置
                  </h3>
                  <p className="text-lg font-black mb-2">xx市xx区xxx街道xx社区</p>
                  <p className="text-xs opacity-70">经度: 121.4737 纬度: 31.2304</p>
                  <div className="mt-4 h-32 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <MapIcon className="w-8 h-8 opacity-50" />
                    <span className="text-xs ml-2">地图加载中...</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => window.location.href = 'tel:120'}
                    className="bg-white/20 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center gap-3 border border-white/20 active:scale-95 transition-transform"
                  >
                    <Phone className="w-8 h-8" />
                    <span className="text-sm font-bold">呼叫 120</span>
                  </button>
                  <button className="bg-white/20 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center gap-3 border border-white/20">
                    <Users className="w-8 h-8" />
                    <span className="text-sm font-bold">通知紧急联系人</span>
                  </button>
                </div>

                <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 text-left">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5" /> 医疗急救卡
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">姓名</span>
                      <span className="font-bold">张大伯</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">血型</span>
                      <span className="font-bold text-red-300">A型 (Rh+)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="opacity-70">过敏史</span>
                      <span className="font-bold">青霉素、花粉</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">既往病史</span>
                      <span className="font-bold">高血压、糖尿病</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white text-design-sos rounded-3xl p-6 text-left">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> 现场自救指导
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
                      <p className="text-sm">保持冷静，深呼吸，确保周围环境安全。</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
                      <p className="text-sm">如果感到胸闷，请立即坐下或平卧，解开衣领。</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
                      <p className="text-sm">等待救援期间，请勿随意走动或饮水。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-24"></div>
            </div>
          </motion.div>
        );
      case 'consultation':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader 
              title="在线问诊" 
              onBack={() => setCurrentView('main')} 
              rightElement={
                <div className="flex gap-2">
                  <button className="p-2 text-design-purple"><Phone className="w-5 h-5" /></button>
                  <button className="p-2 text-design-purple"><Video className="w-5 h-5" /></button>
                </div>
              }
            />
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-purple-50/30">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-3", msg.sender === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", msg.sender === 'user' ? "bg-design-purple" : "bg-purple-100")}>
                    {msg.sender === 'user' ? <UserIcon className="w-6 h-6 text-white" /> : <Stethoscope className="w-6 h-6 text-design-purple" />}
                  </div>
                  <div className={cn(
                    "design-card max-w-[75%] p-3 shadow-sm",
                    msg.sender === 'user' ? "bg-design-purple text-white rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none"
                  )}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={cn("text-[8px] mt-1 text-right", msg.sender === 'user' ? "text-white/60" : "text-slate-400")}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white border-t border-purple-50">
              <div className="flex gap-3 items-center mb-2">
                <button className="p-2 text-slate-400"><Mic className="w-5 h-5" /></button>
                <button className="p-2 text-slate-400"><ImageIcon className="w-5 h-5" /></button>
                <button className="p-2 text-slate-400"><Camera className="w-5 h-5" /></button>
                <button className="p-2 text-slate-400"><Plus className="w-5 h-5" /></button>
              </div>
              <div className="flex gap-3 items-center">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="输入您的问题..." 
                  className="flex-1 bg-purple-50 rounded-full h-12 px-4 outline-none text-sm text-slate-700"
                />
                <button 
                  onClick={handleSendMessage}
                  className="w-12 h-12 bg-design-purple rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-100 active:scale-90 transition-transform"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      case 'reports':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="就医资料与报告" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="design-card flex flex-col items-center gap-2 py-6">
                  <FileText className="w-10 h-10 text-design-purple" />
                  <span className="font-bold">门诊病历</span>
                </div>
                <div className="design-card flex flex-col items-center gap-2 py-6">
                  <ClipboardList className="w-10 h-10 text-blue-500" />
                  <span className="font-bold">出院记录</span>
                </div>
              </div>

              {/* Physical Exam Reports Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-bold text-slate-800">体检报告</h3>
                  <button onClick={() => setCurrentView('physical_exam_record')} className="text-xs text-design-purple font-bold flex items-center gap-1">
                    <Plus className="w-3 h-3" /> 记录报告
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: '2025年度全面体检报告', date: '2025.12.20', status: '已解读', color: 'text-green-500' },
                    { title: '半年常规体检报告', date: '2025.06.15', status: '已解读', color: 'text-green-500' },
                  ].map((report, i) => (
                    <div key={i} onClick={() => setCurrentView('report_detail')} className="design-card flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><FileText className="w-5 h-5 text-blue-500" /></div>
                        <div>
                          <h4 className="font-bold text-sm">{report.title}</h4>
                          <p className="text-[10px] text-slate-400">{report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-[10px] font-bold", report.color)}>{report.status}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 px-1">近期检查报告</h3>
                {[1,2,3].map(i => (
                  <div key={i} onClick={() => setCurrentView('report_detail')} className="design-card flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center"><Activity className="w-5 h-5 text-design-purple" /></div>
                      <div>
                        <h4 className="font-bold text-sm">血常规检查报告</h4>
                        <p className="text-[10px] text-slate-400">2026.03.{10+i}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-green-500 font-bold">正常</span>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'report_detail':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader 
              title="报告详情" 
              onBack={() => setCurrentView('reports')}
              rightElement={<button onClick={() => setCurrentView('consultation')} className="text-xs font-bold text-design-purple">咨询医生</button>}
            />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="design-card bg-gradient-to-br from-white to-purple-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">血常规检查报告</h3>
                    <p className="text-xs text-slate-400 mt-1">检测时间：2026.03.15 09:30</p>
                  </div>
                  <div className="bg-green-100 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 已解读
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-purple-50">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400">异常项</p>
                    <p className="text-lg font-bold text-design-sos">0</p>
                  </div>
                  <div className="text-center border-l border-purple-50">
                    <p className="text-[10px] text-slate-400">健康状态</p>
                    <p className="text-lg font-bold text-green-500">良好</p>
                  </div>
                </div>
              </div>

              <div className="design-card">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-design-purple" /> 医生建议
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-purple-50/50 p-3 rounded-xl border border-purple-50">
                  您的各项指标均在正常范围内。建议继续保持良好的作息习惯，多喝水，适当运动。如有不适请及时复诊。
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 px-1">详细指标</h4>
                {[
                  { name: '白细胞计数', value: '6.5', unit: '10^9/L', range: '4.0-10.0', status: 'normal' },
                  { name: '红细胞计数', value: '4.8', unit: '10^12/L', range: '4.0-5.5', status: 'normal' },
                  { name: '血红蛋白', value: '145', unit: 'g/L', range: '120-160', status: 'normal' },
                  { name: '血小板计数', value: '210', unit: '10^9/L', range: '100-300', status: 'normal' }
                ].map((item, idx) => (
                  <div key={idx} className="design-card flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-bold text-slate-700">{item.name}</p>
                      <p className="text-[10px] text-slate-400">参考范围: {item.range}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-design-purple">{item.value} <span className="text-[10px] font-normal text-slate-400">{item.unit}</span></p>
                      <span className="text-[8px] text-green-500 font-bold">正常</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white border-t border-purple-50">
              <button onClick={() => setCurrentView('consultation')} className="btn-primary">
                <Stethoscope className="w-5 h-5" />
                <span>咨询医生解读</span>
              </button>
            </div>
          </motion.div>
        );
      case 'devices':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60]">
            <SubPageHeader title="我的设备" onBack={() => setCurrentView('main')} />
            <div className="p-4 space-y-6">
              <div className="design-card bg-gradient-to-br from-design-purple to-purple-400 text-white p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5" />
                    <h3 className="text-xl font-bold">主动风险识别</h3>
                  </div>
                  <p className="text-sm opacity-80">当前监测中，未发现异常风险</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px]">实时同步中...</span>
                  </div>
                </div>
                <Activity className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="design-card flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center"><Smartphone className="w-6 h-6 text-slate-600" /></div>
                    <div>
                      <h4 className="font-bold">智能健康手表</h4>
                      <p className="text-xs text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 已连接</p>
                    </div>
                  </div>
                  <MoreHorizontal className="text-slate-300" />
                </div>
                <div className="design-card flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center"><Activity className="w-6 h-6 text-slate-600" /></div>
                    <div>
                      <h4 className="font-bold">电子血压计</h4>
                      <p className="text-xs text-slate-400">未连接</p>
                    </div>
                  </div>
                  <Plus className="text-design-purple" />
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 flex gap-3">
                <Info className="w-5 h-5 text-design-purple shrink-0" />
                <p className="text-[10px] text-design-purple leading-relaxed">
                  绑定更多智能设备（如手环、体脂秤等）可以帮助我们更全面地了解您的健康状况，提供更精准的预警服务。
                </p>
              </div>

              <button onClick={() => setCurrentView('device_connect')} className="btn-secondary">
                <Plus className="w-5 h-5" />
                <span>绑定新设备</span>
              </button>
            </div>
          </motion.div>
        );
      case 'device_connect':
        return (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="添加新设备" onBack={() => setCurrentView('devices')} />
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="relative mb-12">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-design-purple rounded-full"
                />
                <div className="relative w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-xl border-8 border-purple-50">
                  <Smartphone className="w-20 h-20 text-design-purple animate-bounce" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">正在搜索附近设备...</h3>
              <p className="text-sm text-slate-400 mb-12">请确保您的蓝牙已开启，并靠近设备</p>
              
              <div className="w-full space-y-4">
                <div className="design-card flex items-center justify-between p-4 border-2 border-design-purple bg-purple-50/50">
                  <div className="flex items-center gap-3">
                    <Activity className="w-8 h-8 text-design-purple" />
                    <div className="text-left">
                      <p className="font-bold">智能血压计 Pro</p>
                      <p className="text-[10px] text-slate-400">信号强度: 极强</p>
                    </div>
                  </div>
                  <button onClick={() => setCurrentView('devices')} className="bg-design-purple text-white text-xs font-bold px-4 py-2 rounded-full">连接</button>
                </div>
                <button className="btn-secondary">
                  <span>手动输入设备 ID</span>
                </button>
              </div>
            </div>
          </motion.div>
        );
      case 'indicator_history_detail':
        const record = selectedRecord || { type: '心率', val: 85, unit: '次/分', time: '今天 10:30', status: '正常', note: '暂无备注信息。' };
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="检测记录详情" onBack={() => setCurrentView('indicator_detail')} />
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="text-center space-y-4">
                <div className={cn(
                  "w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-xl",
                  record.status === '正常' ? "bg-purple-50 shadow-purple-100" : "bg-orange-50 shadow-orange-100"
                )}>
                  <Activity className={cn("w-12 h-12", record.status === '正常' ? "text-design-purple" : "text-orange-500")} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800">{record.val} <span className="text-sm font-normal text-slate-400">{record.unit}</span></h2>
                  <p className="text-sm text-slate-500 mt-1">{record.type}检测 · {record.time}</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className={cn(
                    "text-[10px] font-bold px-3 py-1 rounded-full",
                    record.status === '正常' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                  )}>
                    {record.status}
                  </span>
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full">手动记录</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="design-card p-5 space-y-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Info className="w-5 h-5 text-design-purple" /> 检测说明
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {record.note}
                  </p>
                </div>

                <div className="design-card p-5 space-y-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-design-purple" /> 趋势分析
                  </h3>
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      相比上一次测量（78 次/分），本次数值上升了 <span className="text-design-purple font-bold">7 次/分</span>。目前仍处于正常健康范围内，请继续保持良好的生活习惯。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 space-y-3">
                <h4 className="font-bold text-blue-700 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> 健康建议</h4>
                <ul className="text-sm text-blue-600 space-y-2 list-disc pl-5">
                  <li>保持规律作息，避免熬夜。</li>
                  <li>适度运动，如散步、太极拳等。</li>
                  <li>饮食清淡，减少高盐高脂食物摄入。</li>
                </ul>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-purple-50 flex gap-4">
              <button 
                onClick={() => {
                  setIsExportModalOpen(true);
                }}
                className="flex-1 border-2 border-design-purple text-design-purple font-bold py-4 rounded-2xl active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>导出此条</span>
              </button>
              <button className="flex-1 btn-primary">
                <span>分享给医生</span>
              </button>
            </div>
          </motion.div>
        );
      case 'indicator_detail':
        const indicatorData: Record<string, any> = {
          '心率': { val: 85, unit: '次/分', history: [
            { type: '心率', val: 85, unit: '次/分', time: '今天 10:30', status: '正常', note: '静息状态下测量，数据平稳。' },
            { type: '心率', val: 78, time: '昨天 09:15', unit: '次/分', status: '正常', note: '早起后测量，身体状态良好。' },
            { type: '心率', val: 92, time: '03.28 20:45', unit: '次/分', status: '偏高', note: '运动后测量，心率略有上升。' },
          ]},
          '血压': { val: '120/80', unit: 'mmHg', history: [
            { type: '血压', val: '120/80', unit: 'mmHg', time: '今天 08:00', status: '正常', note: '晨起空腹测量。' },
            { type: '血压', val: '118/78', unit: 'mmHg', time: '昨天 08:00', status: '正常', note: '晨起空腹测量。' },
            { type: '血压', val: '125/85', unit: 'mmHg', time: '03.28 18:00', status: '正常', note: '晚餐后测量。' },
          ]},
          '体重': { val: 65.5, unit: 'kg', history: [
            { type: '体重', val: 65.5, unit: 'kg', time: '今天 07:30', status: '正常', note: '空腹测量。' },
            { type: '体重', val: 65.8, unit: 'kg', time: '昨天 07:30', status: '正常', note: '空腹测量。' },
          ]},
          '血糖': { val: 5.4, unit: 'mmol/L', history: [
            { type: '血糖', val: 5.4, unit: 'mmol/L', time: '今天 07:00', status: '正常', note: '空腹血糖。' },
            { type: '血糖', val: 5.6, unit: 'mmol/L', time: '昨天 07:00', status: '正常', note: '空腹血糖。' },
          ]},
          '血氧': { val: 98, unit: '%', history: [
            { type: '血氧', val: 98, unit: '%', time: '今天 10:00', status: '正常', note: '静坐测量。' },
            { type: '血氧', val: 97, unit: '%', time: '昨天 10:00', status: '正常', note: '静坐测量。' },
          ]},
        };

        const currentIndicator = indicatorData[selectedIndicatorType] || indicatorData['心率'];

        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="指标记录详情" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {['心率', '血压', '体重', '血糖', '血氧'].map(item => (
                  <div 
                    key={item} 
                    onClick={() => setSelectedIndicatorType(item)}
                    className={cn(
                      "shrink-0 px-6 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer border", 
                      item === selectedIndicatorType ? "bg-design-purple text-white border-design-purple shadow-lg shadow-purple-100" : "bg-white text-slate-500 border-slate-100"
                    )}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="design-card p-6">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">当前{selectedIndicatorType}</p>
                    <h3 className="text-4xl font-black text-design-purple">{currentIndicator.val} <span className="text-sm font-normal">{currentIndicator.unit}</span></h3>
                  </div>
                  <div className="bg-green-100 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 正常范围
                  </div>
                </div>
                
                {/* Visualized Chart Area */}
                <div className="h-48 flex items-end justify-between gap-2 px-2 relative">
                  <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-100"></div>
                  <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-slate-100"></div>
                  <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-slate-100"></div>
                  {[40, 60, 45, 85, 55, 70, 65].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 z-10">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className={cn("w-full rounded-t-lg transition-all", i === 3 ? "bg-design-purple" : "bg-purple-200")} 
                      ></motion.div>
                      <span className="text-[8px] text-slate-400">03.{10+i}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="design-card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-design-purple" /> 历史记录
                  </h4>
                  <button 
                    onClick={() => {
                      setIsExportModalOpen(true);
                    }}
                    className="text-[10px] font-bold text-design-purple active:scale-95 transition-transform"
                  >
                    导出数据
                  </button>
                </div>
                <div className="space-y-4">
                  {currentIndicator.history.map((record: any, i: number) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        setSelectedRecord(record);
                        setCurrentView('indicator_history_detail');
                      }}
                      className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0 cursor-pointer active:bg-slate-50 transition-colors rounded-lg p-1 -mx-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", record.status === '正常' ? "bg-purple-50" : "bg-orange-50")}>
                          <Activity className={cn("w-5 h-5", record.status === '正常' ? "text-design-purple" : "text-orange-500")} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">{record.val} {record.unit}</p>
                          <p className="text-[10px] text-slate-400">{record.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-[10px] font-bold", record.status === '正常' ? "text-green-500" : "text-orange-500")}>{record.status}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-purple-50">
              <button onClick={() => setCurrentView('indicator_record')} className="btn-primary">
                <Plus className="w-5 h-5" />
                <span>记录新数据</span>
              </button>
            </div>
          </motion.div>
        );
      case 'indicator_record':
        return (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="手动记录数据" onBack={() => setCurrentView('indicator_detail')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-8">
              <div className="text-center py-8">
                <p className="text-sm text-slate-400 mb-2">心率 (次/分)</p>
                <div className="flex items-center justify-center gap-6">
                  <button 
                    onClick={() => setRecordValue(prev => Math.max(0, prev - 1))}
                    className="w-12 h-12 rounded-full bg-purple-100 text-design-purple text-2xl font-bold active:scale-90 transition-transform"
                  >-</button>
                  <span className="text-6xl font-black text-design-purple">{recordValue}</span>
                  <button 
                    onClick={() => setRecordValue(prev => prev + 1)}
                    className="w-12 h-12 rounded-full bg-purple-100 text-design-purple text-2xl font-bold active:scale-90 transition-transform"
                  >+</button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '删除'].map(num => (
                  <button 
                    key={num} 
                    onClick={() => {
                      if (num === '删除') {
                        setRecordValue(prev => Math.floor(prev / 10));
                      } else if (num === '.') {
                        // ignore for now
                      } else {
                        setRecordValue(prev => parseInt(`${prev}${num}`));
                      }
                    }}
                    className="h-16 bg-white rounded-2xl shadow-sm border border-slate-50 font-bold text-xl text-slate-700 active:bg-purple-50 transition-colors"
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">记录状态</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['静息', '运动后', '睡眠'].map(status => (
                    <button key={status} className={cn(
                      "py-3 rounded-2xl text-sm font-bold border transition-all",
                      status === '静息' ? "bg-design-purple text-white border-design-purple shadow-lg shadow-purple-100" : "bg-white text-slate-400 border-slate-100"
                    )}>
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">记录时间</h4>
                <div className="design-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-design-purple" />
                    <span className="text-sm font-bold text-slate-700">今天 10:30</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
                <Info className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-[10px] text-blue-600 leading-relaxed">
                  提示：手动记录的数据将标记为“手动输入”，建议配合智能设备自动同步以获得更准确的分析。
                </p>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-purple-50">
              <button 
                onClick={() => {
                  setHealthRecords(prev => ({
                    ...prev,
                    heartRate: [...prev.heartRate, recordValue]
                  }));
                  setCurrentView('indicator_detail');
                }} 
                className="btn-primary"
              >
                确认保存
              </button>
            </div>
          </motion.div>
        );
      case 'medication_management':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="用药管理" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="design-card p-4 bg-gradient-to-br from-design-purple to-purple-600 text-white">
                <p className="text-xs opacity-80 mb-1">今日用药进度</p>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-3xl font-black">2/4</span>
                  <span className="text-xs mb-1 opacity-80">项已完成</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/2 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 px-1">当前用药计划</h3>
                {reminders.map(reminder => (
                  <div key={reminder.id} className="design-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", reminder.status === 'taken' ? "bg-green-50" : "bg-purple-50")}>
                        <ClipboardList className={cn("w-6 h-6", reminder.status === 'taken' ? "text-green-500" : "text-design-purple")} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{reminder.name}</p>
                        <p className="text-xs text-slate-400">用法：1片/次，每日2次</p>
                        <p className="text-[10px] text-design-purple font-bold mt-1">{reminder.time}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button 
                        onClick={() => {
                          setReminders(prev => prev.map(r => r.id === reminder.id ? { ...r, status: 'taken' } : r));
                        }}
                        className={cn(
                          "text-xs font-bold px-4 py-2 rounded-xl transition-all",
                          reminder.status === 'taken' ? "bg-green-100 text-green-600" : "bg-design-purple text-white shadow-lg shadow-purple-100"
                        )}
                      >
                        {reminder.status === 'taken' ? '已服用' : '确认服用'}
                      </button>
                      <button className="text-[10px] text-slate-300">修改计划</button>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setCurrentView('medication_add')} className="w-full border-2 border-dashed border-purple-200 rounded-2xl py-4 flex items-center justify-center gap-2 text-design-purple font-bold text-sm hover:bg-purple-50 transition-colors">
                <Plus className="w-5 h-5" />
                <span>添加新药物</span>
              </button>
            </div>
          </motion.div>
        );
      case 'event_detail':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="活动详情" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto">
              <img src="https://picsum.photos/seed/community_event_big/1200/600" className="w-full aspect-video object-cover" alt="event" referrerPolicy="no-referrer" />
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="bg-purple-100 text-design-purple text-[10px] font-bold px-3 py-1 rounded-full w-fit">社区活动</div>
                  <h2 className="text-2xl font-black text-slate-800">社区健康义诊：专家面对面</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="design-card p-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-design-purple"><Clock className="w-5 h-5" /></div>
                    <div>
                      <p className="text-[10px] text-slate-400">活动时间</p>
                      <p className="text-xs font-bold">03.25 14:00</p>
                    </div>
                  </div>
                  <div className="design-card p-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500"><MapPin className="w-5 h-5" /></div>
                    <div>
                      <p className="text-[10px] text-slate-400">活动地点</p>
                      <p className="text-xs font-bold">社区文化广场</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-800">活动介绍</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    为了关爱社区居民健康，我们特别邀请了市中医院的专家团队进驻社区，开展大型义诊活动。活动内容包括：血压血糖测量、中医体质辨识、健康咨询、免费发放健康手册等。欢迎广大居民踊跃参加。
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-800">活动流程</h3>
                  <div className="space-y-4">
                    {[
                      { time: '14:00 - 14:30', title: '签到与领取手册' },
                      { time: '14:30 - 16:00', title: '专家义诊与咨询' },
                      { time: '16:00 - 16:30', title: '健康知识讲座' },
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-design-purple"></div>
                          <div className="w-0.5 flex-1 bg-purple-100"></div>
                        </div>
                        <div className="pb-4">
                          <p className="text-[10px] text-design-purple font-bold">{step.time}</p>
                          <p className="text-sm font-bold text-slate-700">{step.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-purple-50 flex gap-4">
              <button className="flex-1 border-2 border-design-purple text-design-purple font-bold py-4 rounded-2xl active:scale-95 transition-transform">咨询详情</button>
              <button className="flex-[2] btn-primary">立即报名</button>
            </div>
          </motion.div>
        );
      case 'guide_detail':
        const guide = selectedGuide || {
          title: '心肺复苏 (CPR)',
          tag: '紧急',
          target: '成人',
          icon: Heart,
          steps: [
            { step: '01', title: '确认环境安全', desc: '在施救前，首先确保现场环境对施救者和伤病员都是安全的。' },
            { step: '02', title: '判断意识与呼吸', desc: '轻拍双肩，大声呼唤。观察胸部有无起伏，判断时间不超过10秒。' },
            { step: '03', title: '呼救并获取AED', desc: '大声呼救，指定专人拨打120，并寻找附近的AED设备。' },
            { step: '04', title: '胸外按压', desc: '按压部位：胸骨下半部。按压频率：100-120次/分。按压幅度：5-6厘米。' },
          ],
          tips: [
            '按压过程中手臂应垂直，不可弯曲。',
            '每次按压后应让胸廓充分回弹，但手掌不离开胸壁。',
            '尽量减少按压中断，中断时间不应超过10秒。'
          ]
        };
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="急救指南详情" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-red-100">
                  <guide.icon className="w-12 h-12 text-red-500" />
                </div>
                <h2 className="text-3xl font-black text-slate-800">{guide.title}</h2>
                <div className="flex items-center justify-center gap-2">
                  <span className="bg-red-100 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full">{guide.tag}</span>
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full">{guide.target}</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-bold text-slate-800 text-lg">操作步骤</h3>
                <div className="space-y-6">
                  {guide.steps.map((item: any, i: number) => (
                    <div key={i} className="design-card p-5 flex gap-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-5 font-black text-6xl">{item.step}</div>
                      <div className="w-10 h-10 rounded-full bg-design-purple text-white flex items-center justify-center font-black shrink-0 z-10">{item.step}</div>
                      <div className="space-y-1 z-10">
                        <h4 className="font-bold text-slate-800">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 space-y-3">
                <h4 className="font-bold text-orange-700 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> 注意事项</h4>
                <ul className="text-sm text-orange-600 space-y-2 list-disc pl-5">
                  {guide.tips.map((tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-purple-50 space-y-3">
              {guide.videoTitle && (
                <button 
                  onClick={() => setCurrentView('video_player')}
                  className="w-full border-2 border-design-purple text-design-purple font-bold py-4 rounded-2xl active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  <span>观看视频教学</span>
                </button>
              )}
              <button 
                onClick={() => window.location.href = 'tel:120'}
                className="btn-primary bg-red-500 shadow-red-100"
              >
                <Phone className="w-5 h-5" />
                <span>立即拨打 120</span>
              </button>
            </div>
          </motion.div>
        );
      case 'medical_path':
        const medical = selectedMedical || { name: 'xx区中心医院', distance: '1.2km', type: '三甲医院' };
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="前往路线" onBack={() => setCurrentView('medical_map')} />
            <div className="flex-1 relative bg-slate-200 overflow-hidden">
              {/* Mock Path Map */}
              <img src="https://picsum.photos/seed/medical_path/1200/1600" className="w-full h-full object-cover" alt="path map" referrerPolicy="no-referrer" />
              
              {/* Path Overlay (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 800">
                <path 
                  d="M 200 700 Q 250 500 150 400 T 200 100" 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  strokeDasharray="1, 15"
                  className="animate-[dash_2s_linear_infinite]"
                />
                <circle cx="200" cy="700" r="10" fill="#8B5CF6" />
                <circle cx="200" cy="100" r="12" fill="#EF4444" />
              </svg>

              {/* Path Info Overlay */}
              <div className="absolute top-6 left-4 right-4 flex gap-4">
                <div className="flex-1 design-card p-4 flex items-center gap-4 shadow-xl">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-design-purple">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">预计到达时间</p>
                    <p className="text-lg font-black text-slate-800">12 分钟 <span className="text-sm font-normal text-slate-400">· 1.2km</span></p>
                  </div>
                </div>
              </div>

              {/* Destination Card */}
              <div className="absolute bottom-6 left-4 right-4">
                <div className="design-card p-5 shadow-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-slate-800">{medical.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{medical.type} · {medical.distance}</p>
                    </div>
                    <button onClick={() => window.location.href = 'tel:010-12345678'} className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-design-purple active:scale-90 transition-transform">
                      <Phone className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <p className="text-sm text-slate-600">从 您的当前位置 出发</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <p className="text-sm text-slate-600">到达 {medical.name}</p>
                    </div>
                  </div>

                  <button onClick={() => setCurrentView('main')} className="w-full btn-primary py-4">
                    开始导航
                  </button>
                </div>
              </div>
            </div>
            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -16;
                }
              }
            `}</style>
          </motion.div>
        );
      case 'medical_map':
        return (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="周边医疗地图" onBack={() => setCurrentView('main')} />
            <div className="flex-1 relative bg-slate-200 overflow-hidden">
              {/* Mock Map Background */}
              <img src="https://picsum.photos/seed/medical_map/1200/1600" className="w-full h-full object-cover opacity-60" alt="map" referrerPolicy="no-referrer" />
              
              {/* Map Markers */}
              <div className="absolute top-1/4 left-1/3 animate-bounce">
                <div className="w-10 h-10 bg-design-purple rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute top-1/2 right-1/4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute bottom-1/3 left-1/2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Info Card */}
              <div className="absolute bottom-6 left-4 right-4 space-y-3">
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {['全部', '医院', '社区医疗', '药店'].map((filter, i) => (
                    <button key={i} className={cn("px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-sm", i === 0 ? "bg-design-purple text-white" : "bg-white text-slate-600")}>
                      {filter}
                    </button>
                  ))}
                </div>
                <div className="design-card shadow-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-design-purple" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">xx区中心医院</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1">三甲医院 | 距离您 1.2km</p>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full">营业中</div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.location.href = 'tel:010-12345678'}
                      className="flex-1 bg-purple-50 text-design-purple font-bold py-3 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    >
                      <Phone className="w-4 h-4" /> 电话咨询
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedMedical({ name: 'xx区中心医院', distance: '1.2km', type: '三甲医院' });
                        setCurrentView('medical_path');
                      }}
                      className="flex-1 bg-design-purple text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    >
                      <Navigation className="w-4 h-4" /> 导航前往
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'aed_map':
        return (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="AED地图详情" onBack={() => setCurrentView('main')} />
            <div className="flex-1 relative bg-slate-200 overflow-hidden">
              {/* Mock Map Background */}
              <img src="https://picsum.photos/seed/map/1200/1600" className="w-full h-full object-cover opacity-50 grayscale" alt="map" referrerPolicy="no-referrer" />
              
              {/* Map Markers */}
              <div className="absolute top-1/3 left-1/4 animate-bounce">
                <div className="w-10 h-10 bg-design-sos rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Plus className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute top-1/2 right-1/3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Info Card */}
              <div className="absolute bottom-6 left-4 right-4">
                <div className="design-card shadow-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">社区服务中心 AED</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> 距离您 240米 | 步行 3分钟</p>
                    </div>
                    <div className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full">可用</div>
                  </div>
                  <button className="w-full bg-design-purple text-white font-bold py-3 rounded-2xl">导航前往</button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'service_detail':
        const service = selectedService || {
          title: '社区志愿者服务',
          desc: '为社区老人提供生活协助与关怀',
          icon: Users,
          details: ['代买药品与生活用品', '陪同就医服务', '居家安全检查', '心理慰藉与聊天']
        };
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="服务详情" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto">
              <img src={`https://picsum.photos/seed/${service.title}/1200/600`} className="w-full aspect-video object-cover" alt="service" referrerPolicy="no-referrer" />
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800">{service.title}</h2>
                    <p className="text-sm text-slate-400 mt-1">{service.desc}</p>
                  </div>
                  <div className="bg-purple-100 text-design-purple p-3 rounded-2xl">
                    <service.icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="design-card p-3 text-center">
                    <p className="text-[10px] text-slate-400">服务人数</p>
                    <p className="text-sm font-bold">120+</p>
                  </div>
                  <div className="design-card p-3 text-center">
                    <p className="text-[10px] text-slate-400">好评率</p>
                    <p className="text-sm font-bold">99%</p>
                  </div>
                  <div className="design-card p-3 text-center">
                    <p className="text-[10px] text-slate-400">响应时间</p>
                    <p className="text-sm font-bold">&lt;15min</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-800">服务内容</h3>
                  <div className="space-y-2">
                    {service.details.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-50">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                  <h4 className="font-bold text-design-purple mb-2 flex items-center gap-2"><Info className="w-4 h-4" /> 申请说明</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    本服务仅面向社区内 60岁以上 或 行动不便 的居民。申请后，社区管理员将在 24小时内 与您联系确认。
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-purple-50">
              <button className="btn-primary">立即申请服务</button>
            </div>
          </motion.div>
        );
      case 'physical_exam_record':
        return (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="记录体检报告" onBack={() => setCurrentView('reports')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">报告名称</h4>
                <input 
                  type="text" 
                  placeholder="请输入报告名称，如：2026年度体检" 
                  className="w-full bg-white border border-slate-100 rounded-2xl h-14 px-4 outline-none text-sm text-slate-700 shadow-sm"
                />
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">体检日期</h4>
                <input 
                  type="date" 
                  className="w-full bg-white border border-slate-100 rounded-2xl h-14 px-4 outline-none text-sm text-slate-700 shadow-sm"
                />
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">上传报告照片</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square bg-white border-2 border-dashed border-purple-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-design-purple cursor-pointer">
                    <Camera className="w-6 h-6" />
                    <span className="text-[10px] font-bold">拍照</span>
                  </div>
                  <div className="aspect-square bg-white border-2 border-dashed border-purple-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-design-purple cursor-pointer">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px] font-bold">相册</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">备注信息</h4>
                <textarea 
                  placeholder="请输入备注信息..." 
                  className="w-full bg-white border border-slate-100 rounded-2xl p-4 outline-none text-sm text-slate-700 shadow-sm min-h-[120px]"
                ></textarea>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-purple-50">
              <button onClick={() => setCurrentView('reports')} className="btn-primary">保存报告</button>
            </div>
          </motion.div>
        );
      case 'medical_history':
        return (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="既往病史" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="design-card p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800">已记录病史</h4>
                  <button className="text-xs text-design-purple font-bold">+ 添加</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: '原发性高血压', date: '2015年确诊', status: '持续监测中' },
                    { name: '2型糖尿病', date: '2018年确诊', status: '药物控制中' },
                    { name: '白内障手术', date: '2022年', status: '已康复' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-slate-700">{item.name}</span>
                        <span className="text-[10px] text-design-purple font-bold">{item.status}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{item.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'allergy_history':
        return (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="过敏史" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="design-card p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800">过敏原记录</h4>
                  <button className="text-xs text-design-purple font-bold">+ 添加</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: '青霉素', type: '药物过敏', severity: '严重' },
                    { name: '花粉', type: '吸入性过敏', severity: '中度' },
                    { name: '海鲜', type: '食物过敏', severity: '轻微' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-red-50/30 rounded-xl border border-red-100/50">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-slate-700">{item.name}</span>
                        <span className="text-[10px] text-red-500 font-bold">{item.severity}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'health_score_detail':
        return (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="健康评分解读" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="text-center py-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#f3e8ff" strokeWidth="8" />
                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#7c52a5" strokeWidth="8" strokeDasharray="251" strokeDashoffset={251 - (251 * healthScore) / 100} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-design-purple">{healthScore}</span>
                    <span className="text-[10px] text-slate-400">分</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800">您的健康状况良好</h3>
                <p className="text-xs text-slate-400 mt-2">击败了社区 85% 的同龄人</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">评分维度</h4>
                <div className="space-y-3">
                  {[
                    { label: '生理指标', score: 90, desc: '心率、血压处于理想范围' },
                    { label: '生活习惯', score: 75, desc: '睡眠时间略显不足' },
                    { label: '运动量', score: 82, desc: '每日步数达标' },
                    { label: '用药合规', score: 95, desc: '按时服药记录良好' },
                  ].map((item, i) => (
                    <div key={i} className="design-card p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-slate-700">{item.label}</span>
                        <span className="text-sm font-black text-design-purple">{item.score}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-design-purple rounded-full" style={{ width: `${item.score}%` }}></div>
                      </div>
                      <p className="text-[10px] text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="design-card bg-purple-50 border-purple-100">
                <h4 className="font-bold text-design-purple mb-3 flex items-center gap-2"><Activity className="w-4 h-4" /> 提升建议</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  建议您在晚上 11点前 入睡，保证 7-8小时 的高质量睡眠。同时可以适当增加户外散步时间，呼吸新鲜空气。
                </p>
              </div>
            </div>
          </motion.div>
        );
      case 'medication_add':
        return (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="添加用药提醒" onBack={() => setCurrentView('medication_management')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">药物名称</h4>
                <input 
                  type="text" 
                  placeholder="请输入药物名称，如：阿司匹林" 
                  className="w-full bg-white border border-slate-100 rounded-2xl h-14 px-4 outline-none text-sm text-slate-700 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800">服用剂量</h4>
                  <div className="flex items-center bg-white border border-slate-100 rounded-2xl h-14 px-4 shadow-sm">
                    <input type="number" defaultValue="1" className="w-full outline-none text-sm text-slate-700" />
                    <span className="text-xs text-slate-400">片/次</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800">每日次数</h4>
                  <div className="flex items-center bg-white border border-slate-100 rounded-2xl h-14 px-4 shadow-sm">
                    <input type="number" defaultValue="2" className="w-full outline-none text-sm text-slate-700" />
                    <span className="text-xs text-slate-400">次/日</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">提醒时间</h4>
                <div className="space-y-3">
                  {['08:00', '20:00'].map((time, i) => (
                    <div key={i} className="design-card flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-design-purple" />
                        <span className="text-sm font-bold text-slate-700">{time}</span>
                      </div>
                      <X className="w-4 h-4 text-slate-300" />
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-purple-100 rounded-2xl text-xs text-design-purple font-bold">
                    + 添加提醒时间
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">用药周期</h4>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {['每天', '隔天', '每周', '按需'].map(item => (
                    <div key={item} className={cn(
                      "shrink-0 px-6 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer border", 
                      item === '每天' ? "bg-design-purple text-white border-design-purple shadow-lg shadow-purple-100" : "bg-white text-slate-500 border-slate-100"
                    )}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-purple-50">
              <button onClick={() => setCurrentView('medication_management')} className="btn-primary">保存提醒</button>
            </div>
          </motion.div>
        );
      case 'video_player':
        return (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed inset-0 max-w-6xl mx-auto bg-black z-[100] flex flex-col">
            <div className="p-4 flex items-center justify-between text-white">
              <button onClick={() => setCurrentView('main')} className="p-2 bg-white/10 rounded-full backdrop-blur-md">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-bold">视频教学</h2>
              <button className="p-2 bg-white/10 rounded-full backdrop-blur-md">
                <MoreHorizontal className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative">
              <img src="https://picsum.photos/seed/emergency_video_play/1200/800" className="w-full aspect-video object-cover" alt="video" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40">
                  <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2"></div>
                </div>
              </div>
              
              {/* Video Controls Mock */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent space-y-4">
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-design-purple w-1/3"></div>
                </div>
                <div className="flex justify-between items-center text-white text-xs">
                  <span>01:24 / 03:45</span>
                  <div className="flex gap-4">
                    <span>倍速</span>
                    <span>高清</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-t-[40px] p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-800">
                  {selectedGuide?.videoTitle || '海姆立克急救法详解'}
                </h3>
                <p className="text-xs text-slate-400">发布于 2026.03.20 | 1.2w 次播放</p>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl">
                  <Heart className="w-6 h-6 text-red-500" />
                  <span className="text-[10px] font-bold text-slate-600">收藏</span>
                </button>
                <button className="flex-1 flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl">
                  <Send className="w-6 h-6 text-blue-500" />
                  <span className="text-[10px] font-bold text-slate-600">分享</span>
                </button>
                <button className="flex-1 flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl">
                  <Bell className="w-6 h-6 text-orange-500" />
                  <span className="text-[10px] font-bold text-slate-600">提醒</span>
                </button>
              </div>
            </div>
          </motion.div>
        );
      case 'notice_detail':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="通知详情" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div className="bg-blue-100 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full w-fit">紧急通知</div>
                <h2 className="text-2xl font-black text-slate-800">关于小区 3、5号楼 临时停电的紧急通知</h2>
                <p className="text-xs text-slate-400">发布时间：2026.04.01 10:30</p>
              </div>

              <div className="design-card p-6 bg-blue-50/50 border-blue-100 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  尊敬的业主/住户：
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  因小区外部供电线路突发故障，导致 3号楼、5号楼 目前处于停电状态。电力公司抢修人员已到达现场，预计修复时间为 2小时。
                </p>
                <p className="text-sm font-bold text-design-sos leading-relaxed">
                  特别提醒：家中有使用呼吸机、制氧机等生命维持设备的居民，请立即检查备用电源。如需紧急电力协助，请立即按下 SOS 或联系物业中心。
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  给您带来的不便敬请谅解。
                </p>
                <p className="text-sm text-slate-700 text-right mt-8">
                  xx物业管理中心<br/>
                  2026年4月1日
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">相关联系方式</h4>
                <div className="design-card flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-bold text-slate-700">物业 24小时热线</span>
                  </div>
                  <span className="text-sm font-bold text-blue-500">010-66666666</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-purple-50">
              <button onClick={() => setCurrentView('emergency')} className="btn-primary bg-design-sos shadow-red-100">紧急求助</button>
            </div>
          </motion.div>
        );
      case 'search_results':
        const searchableItems = [
          // 功能
          { id: 'f1', title: '健康检测', type: '功能', view: 'indicator_detail', icon: Activity, color: 'text-design-purple' },
          { id: 'f2', title: '在线问诊', type: '功能', view: 'consultation', icon: Stethoscope, color: 'text-blue-500' },
          { id: 'f3', title: '体检报告', type: '功能', view: 'reports', icon: ClipboardList, color: 'text-orange-500' },
          { id: 'f4', title: '智能设备', type: '功能', view: 'devices', icon: Smartphone, color: 'text-indigo-500' },
          { id: 'f5', title: 'AED地图', type: '功能', view: 'aed_map', icon: MapPin, color: 'text-red-500' },
          { id: 'f6', title: '医疗地图', type: '功能', view: 'medical_map', icon: MapIcon, color: 'text-green-500' },
          { id: 'f7', title: '用药管理', type: '功能', view: 'medication_management', icon: Bell, color: 'text-purple-500' },
          { id: 'f8', title: '紧急联系人', type: '功能', view: 'emergency_contacts', icon: Phone, color: 'text-red-600' },
          { id: 'f9', title: '个人设置', type: '功能', view: 'settings', icon: Settings, color: 'text-slate-500' },
          { id: 'f10', title: '健康评分', type: '功能', view: 'health_score_detail', icon: Activity, color: 'text-design-purple' },
          { id: 'f11', title: '志愿者服务', type: '功能', view: 'service_detail', icon: Users, color: 'text-orange-600', data: { title: '志愿者服务', type: 'volunteer' } },
          
          // 急救知识
          { id: 'k1', title: '心肺复苏 (CPR)', type: '急救知识', view: 'guide_detail', icon: BookOpen, color: 'text-red-500', data: { title: '心肺复苏 (CPR)', type: 'cpr' } },
          { id: 'k2', title: '海姆立克急救法', type: '急救知识', view: 'video_player', icon: Video, color: 'text-blue-500' },
          { id: 'k3', title: '烫伤处理', type: '急救知识', view: 'guide_detail', icon: BookOpen, color: 'text-orange-500', data: { title: '烧伤烫伤', type: 'burns', videoTitle: '烧伤烫伤急救视频教学', tag: '急救', target: '通用', icon: Activity, steps: [
            { step: '01', title: '冲', desc: '用流动清水冲洗伤口15-30分钟，直到疼痛明显减轻。' },
            { step: '02', title: '脱', desc: '在水中小心脱去衣物，如衣物粘连，切勿强行撕扯。' },
            { step: '03', title: '泡', desc: '将伤处浸泡在冷水中，进一步降温。' },
            { step: '04', title: '盖', desc: '用干净的纱布或布料覆盖伤口，切勿涂抹药膏或牙膏。' },
          ], tips: ['不要弄破水泡，以免感染。', '不要使用冰块直接冰敷，以免冻伤。', '严重烧伤请立即就医。'] } },
          { id: 'k4', title: '骨折固定', type: '急救知识', view: 'guide_detail', icon: BookOpen, color: 'text-slate-500', data: { title: '骨折处理', type: 'fractures', videoTitle: '骨折固定与急救视频教学', tag: '急救', target: '通用', icon: Activity, steps: [
            { step: '01', title: '固定伤处', desc: '避免移动受伤部位，防止二次伤害。' },
            { step: '02', title: '止血处理', desc: '如有开放性伤口，先进行止血并覆盖。' },
            { step: '03', title: '寻找支架', desc: '使用木板、树枝或硬纸板作为临时夹板。' },
            { step: '04', title: '包扎固定', desc: '用布条或绷带将夹板固定在伤处两端。' },
          ], tips: ['不要尝试将骨头复位。', '固定时不要过紧，以免影响血液循环。', '观察肢体远端颜色和温度。'] } },
          
          // 健康指南
          { id: 'g1', title: '老年人春季养生指南', type: '健康指南', view: 'guide_detail', icon: Heart, color: 'text-green-500', data: { title: '老年人春季养生指南', type: 'spring_health' } },
          { id: 'g2', title: '高血压饮食建议', type: '健康指南', view: 'guide_detail', icon: Heart, color: 'text-red-400', data: { title: '高血压饮食建议', type: 'hypertension_diet' } },
        ];

        const filteredResults = searchQuery.trim() 
          ? searchableItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()))
          : [];

        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[100] flex flex-col">
            <div className="p-4 bg-white flex items-center gap-4 border-b border-purple-50">
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setCurrentView('main');
                }} 
                className="p-2 text-slate-400"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex-1 bg-purple-50 rounded-full h-12 px-4 flex items-center gap-3">
                <Search className="w-5 h-5 text-purple-300" />
                <input 
                  type="text" 
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索功能、急救知识、指南..." 
                  className="bg-transparent border-none outline-none w-full text-sm text-slate-600" 
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-4 h-4 text-slate-300" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {searchQuery.trim() === '' ? (
                <>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 px-1">热门搜索</h4>
                    <div className="flex flex-wrap gap-2">
                      {['心肺复苏', '高血压饮食', '附近AED', '志愿者服务', '海姆立克', '健康评分'].map(tag => (
                        <button 
                          key={tag} 
                          onClick={() => setSearchQuery(tag)}
                          className="px-4 py-2 bg-white rounded-full text-xs text-slate-600 border border-slate-100 shadow-sm active:scale-95 transition-transform"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 px-1">搜索历史</h4>
                    <div className="space-y-2">
                      {['如何处理烫伤', '社区医院电话'].map(item => (
                        <div key={item} className="flex items-center justify-between py-2 border-b border-slate-50">
                          <button 
                            onClick={() => setSearchQuery(item)}
                            className="flex items-center gap-3 text-slate-600"
                          >
                            <Clock className="w-4 h-4 opacity-40" />
                            <span className="text-sm">{item}</span>
                          </button>
                          <X className="w-4 h-4 text-slate-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 px-1">搜索结果 ({filteredResults.length})</h4>
                  {filteredResults.length > 0 ? (
                    <div className="space-y-3">
                      {filteredResults.map((item) => (
                        <div 
                          key={item.id} 
                          onClick={() => {
                            if (item.data) {
                              if (item.view === 'guide_detail') setSelectedGuide(item.data);
                              if (item.view === 'service_detail') setSelectedService(item.data);
                            }
                            setCurrentView(item.view as any);
                          }}
                          className="design-card p-4 flex items-center justify-between cursor-pointer active:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50", item.color)}>
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">{item.title}</p>
                              <p className="text-[10px] text-slate-400">{item.type}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
                      <Search className="w-12 h-12 opacity-20" />
                      <p className="text-sm">未找到相关内容，换个词试试吧</p>
                    </div>
                  )}
                </div>
              )}

              {searchQuery.trim() === '' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 px-1">为您推荐</h4>
                  {[
                    { title: '老年人春季养生指南', type: '健康指南', view: 'guide_detail', data: { title: '老年人春季养生指南', type: 'spring_health' }, color: 'text-green-500', icon: Heart },
                    { title: '心肺复苏 (CPR) 教学', type: '急救知识', view: 'guide_detail', data: { title: '心肺复苏 (CPR)', type: 'cpr' }, color: 'text-red-500', icon: BookOpen },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        setSelectedGuide(item.data);
                        setCurrentView(item.view as any);
                      }}
                      className="design-card p-4 flex items-center justify-between cursor-pointer active:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50", item.color)}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.title}</p>
                          <p className="text-[10px] text-slate-400">{item.type}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      case 'emergency_contacts':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="紧急联系电话" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 px-1">公共急救</h3>
                {[
                  { name: '急救中心', tel: '120', desc: '医疗急救、救护车' },
                  { name: '报警电话', tel: '110', desc: '治安、刑事案件' },
                  { name: '火警电话', tel: '119', desc: '火灾、抢险救援' },
                ].map((item, i) => (
                  <div key={i} className="design-card flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                    <a href={`tel:${item.tel}`} className="bg-red-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg shadow-red-100 active:scale-95 transition-transform">
                      {item.tel}
                    </a>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 px-1">社区与物业</h3>
                {[
                  { name: '居委会', tel: '010-88888888', desc: '社区事务咨询' },
                  { name: '物业服务', tel: '010-66666666', desc: '报修、紧急求助' },
                  { name: '社区卫生站', tel: '010-77777777', desc: '基础医疗咨询' },
                ].map((item, i) => (
                  <div key={i} className="design-card flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                        <Home className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                    <a href={`tel:${item.tel}`} className="bg-blue-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg shadow-blue-100 active:scale-95 transition-transform">
                      呼叫
                    </a>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 px-1">我的紧急联系人</h3>
                {[
                  { name: '儿子 (张强)', tel: '13800000000', desc: '第一联系人' },
                  { name: '老伴', tel: '13900000000', desc: '第二联系人' },
                ].map((item, i) => (
                  <div key={i} className="design-card flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-design-purple">
                        <UserIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                    <a href={`tel:${item.tel}`} className="bg-design-purple text-white font-bold px-4 py-2 rounded-xl shadow-lg shadow-purple-100 active:scale-95 transition-transform">
                      呼叫
                    </a>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-purple-200 rounded-2xl py-4 flex items-center justify-center gap-2 text-design-purple font-bold text-sm hover:bg-purple-50 transition-colors">
                  <Plus className="w-5 h-5" />
                  <span>添加联系人</span>
                </button>
              </div>
            </div>
          </motion.div>
        );
      case 'edit_profile':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="编辑个人信息" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="flex flex-col items-center py-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-purple-100 rounded-full border-4 border-white shadow-md overflow-hidden">
                    <img src={userProfile.avatar} className="w-full h-full object-cover" alt="avatar" referrerPolicy="no-referrer" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-design-purple rounded-full flex items-center justify-center text-white border-2 border-white">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-3">点击更换头像</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 ml-1">姓名</label>
                  <input 
                    type="text" 
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    className="w-full bg-white border border-purple-50 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-design-purple transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 ml-1">手机号</label>
                  <input 
                    type="text" 
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    className="w-full bg-white border border-purple-50 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-design-purple transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 ml-1">居住地址</label>
                  <textarea 
                    value={userProfile.address}
                    onChange={(e) => setUserProfile({...userProfile, address: e.target.value})}
                    className="w-full bg-white border border-purple-50 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-design-purple transition-colors h-24 resize-none"
                  />
                </div>
              </div>

              <button 
                onClick={() => setCurrentView('main')}
                className="btn-primary mt-8"
              >
                保存修改
              </button>
            </div>
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="设置与隐私" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 px-1">通用设置</h3>
                <div className="design-card p-0 overflow-hidden">
                  {[
                    { label: '个人资料', icon: UserIcon, color: 'text-purple-500' },
                    { label: '账号安全', icon: Lock, color: 'text-blue-500' },
                    { label: '通知设置', icon: Bell, color: 'text-orange-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <item.icon className={cn("w-4 h-4", item.color)} />
                        <span className="text-sm font-bold text-slate-700">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 px-1">其他</h3>
                <div className="design-card p-0 overflow-hidden">
                  {[
                    { label: '清除缓存', value: '128 MB' },
                    { label: '关于我们', value: 'v1.2.0' },
                    { label: '意见反馈', value: '' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0">
                      <span className="text-sm font-bold text-slate-700">{item.label}</span>
                      <div className="flex items-center gap-2">
                        {item.value && <span className="text-xs text-slate-400">{item.value}</span>}
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'privacy_security':
        return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 max-w-6xl mx-auto bg-design-bg z-[60] flex flex-col">
            <SubPageHeader title="隐私与安全" onBack={() => setCurrentView('main')} />
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="design-card bg-blue-50 border-blue-100 p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-blue-700">您的数据已加密保护</h4>
                  <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                    我们采用端到端加密技术，确保您的健康数据和个人隐私仅供您本人及授权医生查看。
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 px-1">隐私权限</h3>
                <div className="design-card p-0 overflow-hidden">
                  {[
                    { label: '位置信息权限', desc: '用于紧急求助定位', icon: MapPin },
                    { label: '健康数据共享', desc: '用于医生在线问诊', icon: Activity },
                    { label: '麦克风与相机', desc: '用于视频问诊', icon: Camera },
                  ].map((item, i) => (
                    <div key={i} className="p-4 border-b border-slate-50 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">{item.label}</span>
                        </div>
                        <div className="w-10 h-5 bg-design-purple rounded-full relative">
                          <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 ml-7">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 px-1">安全设置</h3>
                <div className="design-card p-0 overflow-hidden">
                  {[
                    { label: '指纹/面容识别', icon: UserCheck },
                    { label: '隐私模式', icon: EyeOff },
                    { label: '注销账号', icon: AlertCircle, color: 'text-red-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <item.icon className={cn("w-4 h-4", item.color || "text-slate-400")} />
                        <span className={cn("text-sm font-bold", item.color || "text-slate-700")}>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-6xl mx-auto min-h-screen bg-design-bg flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-design-purple rounded-3xl flex items-center justify-center shadow-xl shadow-purple-100">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">智慧康养</h1>
            <p className="text-slate-400 text-sm">守护您的健康，温暖您的生活</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-slate-500 ml-1">手机号</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="请输入您的手机号"
                  className="w-full bg-white border border-purple-50 rounded-2xl p-4 pl-12 text-sm font-bold text-slate-700 outline-none focus:border-design-purple transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-slate-500 ml-1">验证码</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input 
                    type="text" 
                    placeholder="请输入验证码"
                    className="w-full bg-white border border-purple-50 rounded-2xl p-4 pl-12 text-sm font-bold text-slate-700 outline-none focus:border-design-purple transition-colors"
                  />
                </div>
                <button className="px-4 bg-purple-50 text-design-purple font-bold text-xs rounded-2xl border border-purple-100 active:scale-95 transition-all">
                  获取验证码
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="btn-primary w-full py-5 text-lg shadow-xl shadow-purple-100"
            >
              登录 / 注册
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <input type="checkbox" id="terms" className="accent-design-purple" />
              <label htmlFor="terms">我已阅读并同意 <span className="text-design-purple font-bold">用户协议</span> 和 <span className="text-design-purple font-bold">隐私政策</span></label>
            </div>
          </div>

          <div className="pt-12">
            <p className="text-xs text-slate-300 mb-6">其他登录方式</p>
            <div className="flex justify-center gap-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 cursor-pointer active:scale-90 transition-all">
                <img src="https://img.icons8.com/color/48/000000/weixing.png" className="w-6 h-6" alt="wechat" />
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 cursor-pointer active:scale-90 transition-all">
                <img src="https://img.icons8.com/color/48/000000/alipay.png" className="w-6 h-6" alt="alipay" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-design-bg relative overflow-x-hidden shadow-2xl border-x border-purple-50">
      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <div key={activeTab}>
          {renderMainContent()}
        </div>
      </AnimatePresence>

      {/* Sub-pages Overlay */}
      <AnimatePresence>
        {renderSubPage()}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} onSosTrigger={() => setCurrentView('emergency')} />

      {/* Export Modal */}
      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        type={selectedIndicatorType}
      />
    </div>
  );
}
