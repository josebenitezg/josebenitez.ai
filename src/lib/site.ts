export const siteConfig = {
  name: "José Benítez",
  fullName: "Jose Benitez Genes",
  url: "https://www.josebenitez.ai",
  title: "José Benítez — AI systems for the physical world",
  description:
    "Electrical engineer, founder, and AI operator working across computer vision, AI infrastructure, IoT, and applied machine learning.",
  links: {
    github: "https://github.com/josebenitezg",
    linkedin: "https://www.linkedin.com/in/josebenitezg/",
    x: "https://x.com/joselobenitezg",
    instagram: "https://www.instagram.com/joselobenitezg",
  },
} as const;

export const credentials = [
  {
    label: "Current role",
    value: "Founder & Chief AI Officer · Intuitivo",
  },
  {
    label: "Recognition",
    value: "MIT Innovator Under 35 · 2022",
  },
  {
    label: "Public collaboration",
    value: "AWS Machine Learning",
  },
] as const;

export const capabilities = [
  {
    number: "01",
    title: "AI strategy & advisory",
    description:
      "Clarify where AI can create durable value, what should be built, and what should stay simple. Best suited to teams moving from exploration to an executable technical roadmap.",
  },
  {
    number: "02",
    title: "Computer vision & inference",
    description:
      "Architecture for camera-based systems across edge and cloud, with attention to latency, reliability, model constraints, and the economics of inference.",
  },
  {
    number: "03",
    title: "AI infrastructure",
    description:
      "Practical systems for deploying and operating machine learning workloads, from data and training decisions to production inference and observability.",
  },
  {
    number: "04",
    title: "Technical diligence & workshops",
    description:
      "Focused reviews for founders and technical leaders evaluating AI roadmaps, architectures, technical risk, or a build-versus-buy decision.",
  },
] as const;

export const selectedWork = [
  {
    title: "Intuitivo",
    eyebrow: "Founder & Chief AI Officer",
    description:
      "Leading the development of AI infrastructure for unattended retail, combining computer vision, IoT, and cloud systems for autonomous points of purchase.",
    areas: [
      "Camera-first perception",
      "Cloud inference infrastructure",
      "Applied AI in physical retail",
    ],
    href: "/work#intuitivo",
  },
  {
    title: "AWS Inferentia",
    eyebrow: "Public technical collaboration",
    description:
      "A documented collaboration with AWS around running computer-vision inference on purpose-built accelerators with PyTorch and AWS Neuron.",
    areas: [
      "CNN inference",
      "Cost and throughput optimization",
      "PyTorch · AWS Neuron",
    ],
    href: "/work#aws-inferentia",
  },
  {
    title: "Aratiri",
    eyebrow: "Founder & former CTO",
    description:
      "Work at the intersection of digital manufacturing, 3D design and printing, and connected hardware systems.",
    areas: [
      "Digital manufacturing",
      "3D design and printing",
      "IoT systems",
    ],
    href: "/work#aratiri",
  },
] as const;

export const featuredLinks = {
  aws: "https://aws.amazon.com/blogs/machine-learning/intuitivo-achieves-higher-throughput-while-saving-on-ai-ml-costs-using-aws-inferentia-and-pytorch/",
  yoloVision:
    "https://www.youtube.com/live/xWZ9mW7Z4Tc?si=e9eTO6KDl4xBdAHA&t=21551",
  openCv: "https://www.youtube.com/watch?v=IXhUOPBqyz4",
  mit: "https://www.innovatorsunder35.com/the-list/josé-benítez/",
} as const;
