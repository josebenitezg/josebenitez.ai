export const siteConfig = {
  name: "José Benítez",
  fullName: "Jose Benitez Genes",
  url: "https://www.josebenitez.ai",
  title: "José Benítez — Physical AI & correlations",
  description:
    "Physical AI systems and correlations across computer vision, compute, energy, infrastructure, and real-world system performance.",
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
    title: "Physical AI strategy",
    description:
      "Define where perception and autonomy can create durable value, what the system must sense, and which real-world constraints belong in the technical roadmap.",
  },
  {
    number: "02",
    title: "Computer vision & perception",
    description:
      "Architecture for camera-based systems across edge and cloud, with attention to sensing conditions, latency, reliability, model limits, and inference economics.",
  },
  {
    number: "03",
    title: "Edge & cloud AI infrastructure",
    description:
      "Production systems for moving physical-world data from capture to inference, with explicit decisions around deployment, observability, cost, and recovery.",
  },
  {
    number: "04",
    title: "System evaluation & diligence",
    description:
      "Focused reviews for founders and technical leaders evaluating perception systems, architecture risk, operating constraints, or a build-versus-buy decision.",
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
