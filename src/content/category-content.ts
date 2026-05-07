import type { FaqItem } from "@/lib/types";

interface CategoryContent {
  buyingGuide: { title: string; content: string }[];
  faqs: FaqItem[];
}

const content: Record<string, CategoryContent> = {
  "standing-desks": {
    buyingGuide: [
      {
        title: "Motor Type: Single vs. Dual",
        content:
          "Single-motor standing desks cost less and run quieter, but they top out around 200 lbs of lift capacity and take noticeably longer to transition. Dual-motor frames lift faster (roughly 1.5 inches per second), support heavier loads up to 350+ lbs, and distribute force more evenly, which extends motor life. If you plan on running a multi-monitor setup or a heavy hardwood desktop, dual motors are worth the premium.",
      },
      {
        title: "Height Range and User Fit",
        content:
          "Most standing desks range from about 23 inches to 49 inches at the keypad. That covers sitting for users around 5'2\" through standing for those up to about 6'4\". If you are at the extremes of that range, look for 3-stage legs that offer additional travel. Pair the desk height with your monitor arm and chair height to confirm the ergonomic envelope actually fits your body before you buy.",
      },
      {
        title: "Stability and Desktop Size",
        content:
          "Wobble at full height is the number-one complaint in standing desk reviews. Cross-brace designs and wider feet significantly reduce side-to-side movement. Desktop size matters too: a 48x24 surface fits a single monitor and a laptop; a 60x30 desktop accommodates dual monitors, a keyboard tray, and desk accessories without crowding. Measure your available floor space and cable run before ordering.",
      },
      {
        title: "Warranty and After-Sales Support",
        content:
          "Standing desk frames see heavy mechanical use, so warranty length is a genuine signal of build quality. Budget frames typically carry 3-to-5-year coverage, while premium options offer 10-to-15-year or even lifetime frame warranties. Pay attention to what is actually covered — some warranties exclude the motor, electronics, or desktop surface. Responsive customer support with domestic parts stocking can save weeks of downtime if a component fails.",
      },
    ],
    faqs: [
      {
        question: "How often should I alternate between sitting and standing?",
        answer:
          "Research from the Cornell Human Factors Lab suggests a 20-8-2 pattern: 20 minutes sitting, 8 minutes standing, and 2 minutes of light movement. Starting with even 15 minutes of standing per hour is a good baseline. The key is regular transitions — standing all day is almost as problematic as sitting all day.",
      },
      {
        question: "What is the ideal standing desk height for my body?",
        answer:
          "When standing, your elbows should form roughly a 90-degree angle with your forearms parallel to the floor. Your monitor top should sit at or slightly below eye level. For most people between 5'6\" and 6'0\", that means a desk height between 38 and 44 inches. Use an ergonomic desk height calculator to dial in the exact number for your frame.",
      },
      {
        question: "Do standing desks really reduce back pain?",
        answer:
          "Multiple peer-reviewed studies, including a 2018 report in the British Medical Journal, show that sit-stand desks reduce lower-back discomfort by up to 32% compared to fixed sitting. The benefit comes mainly from postural variation, not from standing itself. Combining a standing desk with movement breaks and a supportive chair gives the best results.",
      },
      {
        question: "Are standing desk mats worth the extra cost?",
        answer:
          "Yes. A quality anti-fatigue mat reduces pressure on your feet, knees, and lower back by about 60% compared to standing on a hard floor. Look for a mat with beveled edges, at least 3/4-inch thickness, and a non-slip base. Expect to spend $40–$80 for one that holds up over years of use.",
      },
      {
        question: "Can I use my existing desktop with a new standing desk frame?",
        answer:
          "Most standing desk frames accept any desktop between 43 inches and 80 inches wide, provided it is at least 3/4-inch thick. You will need to drill pilot holes for the mounting screws, which takes about 10 minutes with a basic drill. Just confirm the frame's weight capacity covers your desktop weight plus all your gear.",
      },
    ],
  },
  "ergonomic-chairs": {
    buyingGuide: [
      {
        title: "Lumbar Support Mechanisms",
        content:
          "Adjustable lumbar support is the single most important feature in an ergonomic chair. Fixed lumbar curves work only if your spine matches the chair's profile exactly. Height-adjustable and depth-adjustable lumbar pads let you position the support precisely in the small of your back. Chairs with dynamic lumbar — a flexible plate that follows your posture shifts — offer the best comfort across long sessions.",
      },
      {
        title: "Seat Depth and Cushion Material",
        content:
          "A proper seat depth leaves 2–4 fingers of space between the front edge and the back of your knees. If the seat is too long, it presses into your calves and restricts circulation; too short and your thighs lack support. Mesh seats breathe better in warm climates, foam distributes pressure more evenly, and hybrid designs combine both. Check whether the seat pan slides forward and back — a fixed-depth seat limits who can use it comfortably.",
      },
      {
        title: "Armrest Adjustability",
        content:
          "Budget chairs offer only height adjustment, while premium chairs provide 4D armrests — height, width, depth, and pivot angle. Properly positioned armrests take load off your shoulders and reduce the risk of repetitive strain injuries in your wrists. Soft-top pads prevent elbow pressure points. Make sure the armrests can tuck low enough to clear your desk edge when you pull in close.",
      },
      {
        title: "Weight Capacity and Warranty",
        content:
          "Standard ergonomic chairs are rated for 250–300 lbs, while heavy-duty models support up to 400+ lbs. Exceeding the rated capacity accelerates wear on the gas cylinder and tilt mechanism. Warranty is a reliability indicator: chairs with 12-year warranties (like the Steelcase Leap) have undergone significantly more durability testing than those with 2-year coverage. Always register your purchase to activate the full warranty.",
      },
    ],
    faqs: [
      {
        question: "How long does an ergonomic chair last?",
        answer:
          "A well-built ergonomic chair from a reputable manufacturer lasts 8–15 years with regular use. Key wear points are the gas cylinder, seat foam, and armrest pads. Mesh-back chairs tend to outlast foam-back models because mesh does not compress over time. Replacing the gas cylinder around year 8 is an inexpensive way to extend the chair's life further.",
      },
      {
        question: "Is a mesh chair better than a foam chair?",
        answer:
          "It depends on your priorities. Mesh breathes significantly better, which reduces heat buildup during 8+ hour sessions — ideal for warm offices. Foam provides a plush, cushioned feel and distributes weight more evenly, which some people prefer. Many premium chairs now use mesh backs with foam seats to combine the ventilation benefits with pressure relief.",
      },
      {
        question: "What is the ideal seat height for an ergonomic chair?",
        answer:
          "Your feet should rest flat on the floor with your thighs parallel to the ground and your knees at roughly 90 degrees. For most adults, that means a seat height between 16 and 21 inches. If your desk is too high for this, use a footrest rather than raising the chair higher, which would leave your feet dangling.",
      },
      {
        question: "Are expensive ergonomic chairs worth the investment?",
        answer:
          "For anyone sitting 6+ hours a day, a quality ergonomic chair is one of the best health investments you can make. Chairs in the $800–$1,400 range from brands like Steelcase, Herman Miller, or Humanscale offer significantly better adjustability, durability, and long-term warranty support than $200 alternatives. Over a 10-year lifespan, the daily cost is negligible compared to potential medical costs from poor posture.",
      },
      {
        question: "How do I adjust my chair to reduce neck and shoulder pain?",
        answer:
          "Start by setting seat height so your feet are flat on the floor. Move the lumbar support to the curve of your lower back. Adjust the seat depth so there is a 2-finger gap behind your knees. Set armrests so your shoulders are relaxed and elbows bend at 90 degrees. Finally, tilt the backrest slightly back (100–110 degrees) to reduce spinal disc pressure. Reassess after a week and fine-tune.",
      },
    ],
  },
  "monitor-arms": {
    buyingGuide: [
      {
        title: "Weight Capacity and VESA Compatibility",
        content:
          "Every monitor arm lists a weight range, typically 4–20 lbs for single-arm models and up to 40 lbs for heavy-duty dual arms. Exceeding that range causes the arm to droop over time and can damage the clamp. Confirm your monitor supports 75x75mm or 100x100mm VESA mounting. Ultrawide monitors (34 inches and above) often need arms specifically rated for wider loads and higher weight.",
      },
      {
        title: "Clamp vs. Grommet vs. Wall Mount",
        content:
          "Clamp mounts grip the desk edge — they are the easiest to install and relocate but require a desk lip of at least 3/4-inch thickness. Grommet mounts bolt through a hole in the desk, providing a cleaner look and more stability but requiring a permanent cutout. Wall mounts free up desk space entirely and eliminate arm wobble. Choose based on your desk material, your willingness to drill, and how often you might rearrange your setup.",
      },
      {
        title: "Range of Motion and Cable Management",
        content:
          "A good monitor arm offers tilt (roughly -90° to +85°), swivel (180° or more), and rotation for portrait mode. Gas-spring mechanisms allow smooth, tool-free height adjustment. Integrated cable channels keep power and video cables tidy — exposed cables defeat the purpose of a clean desk. Test the arm's reach in both extended and retracted positions to make sure it covers your preferred viewing distance.",
      },
      {
        title: "Build Quality and Desk Protection",
        content:
          "Arms constructed from die-cast aluminum or steel alloy outlast plastic-heavy models by years. Rubber or silicone pads on the clamp protect your desk surface from scratches and dents. Internal gas springs should be nitrogen-filled for consistent tension across temperature changes. A loose or cheap clamp will vibrate when you type and can even slip over time, so prioritize solid clamping hardware.",
      },
    ],
    faqs: [
      {
        question: "Can I use a monitor arm with a glass desk?",
        answer:
          "It is possible but risky. Glass desks can crack under clamp pressure. Use a grommet mount through an existing cable hole, or place a large metal reinforcement plate between the clamp and the glass to distribute force. Some manufacturers sell glass-desk adapter plates specifically for this purpose. Proceed with caution and never over-tighten.",
      },
      {
        question: "How much weight can a typical single monitor arm hold?",
        answer:
          "Most quality single monitor arms support between 8 and 20 lbs. Budget arms top out around 15 lbs, while premium models from Ergotron or Humanscale handle up to 42 lbs. Always check the exact model — the arm's rated range must match or exceed your monitor's weight including the VESA adapter plate.",
      },
      {
        question: "Do monitor arms help with neck pain?",
        answer:
          "Yes, significantly. A monitor arm lets you position the screen exactly at eye level and at the correct distance (20–26 inches), which eliminates the forward head tilt that causes neck and shoulder strain. Being able to adjust height throughout the day as your posture shifts further reduces static load on your cervical spine.",
      },
      {
        question: "What VESA size does my monitor need?",
        answer:
          "Most monitors 24 inches and larger use either 75x75mm or 100x100mm VESA patterns. The vast majority of monitor arms ship with adapters for both sizes. Check the back of your monitor for four threaded holes arranged in a square. If your monitor does not have VESA holes, aftermarket VESA adapter brackets are available for many popular models.",
      },
      {
        question: "Is a gas-spring or mechanical-spring arm better?",
        answer:
          "Gas-spring arms offer smoother, quieter adjustment and are easier to reposition with one hand. Mechanical-spring arms use a counterbalance and bolt-tightening system that holds position very firmly but requires a tool to change height. For daily repositioning, gas-spring is more convenient. For a set-it-and-forget-it setup, a mechanical spring provides rock-solid stability.",
      },
    ],
  },
  "desk-mats": {
    buyingGuide: [
      {
        title: "Material and Surface Texture",
        content:
          "Desk mats come in cloth, leather, cork, and synthetic blends. Cloth mats offer the best mouse tracking and are usually machine-washable. Leather mats look premium and resist spills but can develop a sheen over time. Cork is eco-friendly and naturally antimicrobial but less durable. If you use a mouse without a separate pad, prioritize a micro-weave cloth surface for consistent sensor tracking.",
      },
      {
        title: "Size and Desk Coverage",
        content:
          "Standard desk mats measure around 35x16 inches — enough for a keyboard and mouse. Extended mats at 47x23 inches cover most of a 48-inch desktop. Full-coverage mats (60x30+) protect the entire surface but may interfere with clamp-mounted accessories. Measure your desk and plan for at least 2 inches of clearance around the edges to avoid curling against walls or monitor stands.",
      },
      {
        title: "Edge Stitching and Durability",
        content:
          "Stitched edges prevent fraying and roughly double the lifespan of a cloth desk mat. Look for reinforced, low-profile stitching that does not catch on your wrist or mouse. Heat-cut edges are an alternative but tend to peel over time. A quality stitched desk mat should maintain its shape and edge integrity for 2–3 years of daily use.",
      },
      {
        title: "Base Grip and Water Resistance",
        content:
          "A rubber or silicone non-slip base is essential — a sliding desk mat is worse than no mat at all. Natural rubber grips better than synthetic alternatives, especially on smooth or glossy desk surfaces. Water-resistant coatings protect against coffee spills; some mats even offer full waterproof backing. Test the mat on your specific desk surface since grip performance varies by material pairing.",
      },
    ],
    faqs: [
      {
        question: "How do I clean a cloth desk mat?",
        answer:
          "Most cloth desk mats can be hand-washed with mild soap and cold water. Lay it flat to dry — never wring or machine-dry, as the heat warps the rubber base. For spot cleaning, a damp microfiber cloth with a small amount of dish soap handles most stains. Deep clean every 3–4 months to prevent oil buildup from your wrists.",
      },
      {
        question: "Does a desk mat improve mouse accuracy?",
        answer:
          "Yes. A consistent micro-weave surface gives optical and laser mouse sensors a uniform tracking plane, which eliminates the inconsistencies caused by wood grain, glass glare, or desk texture. Many competitive gamers and designers use desk mats specifically for this reason. Even a budget cloth mat outperforms most bare desk surfaces.",
      },
      {
        question: "Are leather desk mats worth the premium price?",
        answer:
          "Leather mats cost 2–3x more than cloth equivalents, but they offer a refined aesthetic and superior spill resistance. Real leather develops a patina over time, which some users value. The trade-off is slightly less consistent mouse tracking compared to micro-weave cloth. PU leather alternatives provide a similar look at lower cost, though they do not age as gracefully.",
      },
      {
        question: "What size desk mat should I get?",
        answer:
          "For a minimal keyboard-and-mouse setup, a 35x16-inch mat works well. If you want your desk mat to serve as a full surface protector, go for a 47x23-inch or larger extended mat. The most popular size on our test bench is 36x17 inches, which covers keyboard and mouse with a comfortable margin on standard 48-inch desks.",
      },
      {
        question: "Can a desk mat damage my desk surface?",
        answer:
          "A desk mat actually protects your desk from scratches, heat marks, and stains. However, mats with low-quality rubber bases can leave residue on certain finishes if left in place for years. Periodically lifting the mat and wiping both surfaces prevents any adhesion issues. On painted or lacquered surfaces, test a small corner first.",
      },
    ],
  },
  webcams: {
    buyingGuide: [
      {
        title: "Resolution: 1080p vs. 4K",
        content:
          "For standard video calls, 1080p at 30 fps is the practical sweet spot — most conferencing platforms compress higher resolutions anyway. 4K webcams shine for content creators and streamers who need the extra detail for cropping and digital zoom. If your internet upload speed is under 10 Mbps, a 4K webcam will still be sending a compressed 1080p stream, making the premium less justifiable for meetings.",
      },
      {
        title: "Low-Light Performance and Sensor Size",
        content:
          "Home offices frequently suffer from mixed or insufficient lighting. Webcams with larger sensors (1/2.8-inch or bigger) and wide apertures (f/2.0 or lower) capture significantly more light, producing cleaner images without aggressive noise reduction that smears detail. Look for models with dedicated low-light correction modes. A good sensor saves you from needing a ring light in most conditions.",
      },
      {
        title: "Autofocus and Field of View",
        content:
          "Fast, reliable autofocus keeps you sharp even when you lean in or gesture. Fixed-focus webcams are cheaper but blur at close distances. A 78–90 degree field of view works well for solo calls, while wider angles (up to 120 degrees) suit conference rooms. Be cautious with very wide FOVs — they can distort edges and reveal more of your background than you might want.",
      },
      {
        title: "Microphone Quality and Privacy",
        content:
          "Built-in webcam microphones have improved significantly, with many models now offering dual omnidirectional or beamforming arrays with noise cancellation. However, a dedicated USB microphone still outperforms any webcam mic for voice clarity. Privacy shutters are increasingly standard and give you physical assurance that the camera is off. Some webcams also include indicator LEDs for additional security.",
      },
    ],
    faqs: [
      {
        question: "Do I really need a 4K webcam for Zoom calls?",
        answer:
          "For most people, no. Zoom, Teams, and Google Meet typically cap video quality at 1080p or lower depending on bandwidth and plan tier. A high-quality 1080p webcam with good low-light performance will look better in real-world conditions than a 4K webcam with a poor sensor. Save the 4K premium for streaming or recording where native resolution matters.",
      },
      {
        question: "How do I improve my webcam video quality without buying a new camera?",
        answer:
          "Lighting is the single biggest improvement. Position a light source in front of you, slightly above eye level, and avoid backlighting from windows. Use the webcam software to adjust white balance, exposure, and saturation. Ensure the lens is clean — a quick wipe with a microfiber cloth removes the oil smudges that degrade sharpness more than any technical limitation.",
      },
      {
        question: "Can I use a DSLR camera as a webcam instead?",
        answer:
          "Yes. Most modern DSLRs and mirrorless cameras support clean HDMI output through a capture card like the Elgato Cam Link. The image quality will far exceed any webcam. The trade-offs are cost, setup complexity, and the camera potentially overheating during long sessions. If you already own a compatible camera, it can be an excellent upgrade.",
      },
      {
        question: "Where should I mount my webcam for the best angle?",
        answer:
          "Position the webcam at eye level or slightly above, centered on your primary monitor. This creates the most natural, flattering angle and approximates eye contact when you look at the screen. Mounting below eye level (like on a laptop screen) creates an unflattering up-the-nose perspective. A small tripod or monitor-top mount solves this for most setups.",
      },
      {
        question: "How important is the webcam frame rate?",
        answer:
          "30 fps is standard and sufficient for video calls. 60 fps provides noticeably smoother motion, which benefits streamers and presenters who gesture frequently. Higher frame rates also reduce motion blur. Most people will not notice the difference on a video call, but for content creation or streaming, 60 fps is a worthwhile step up.",
      },
    ],
  },
  keyboards: {
    buyingGuide: [
      {
        title: "Switch Type: Linear, Tactile, and Clicky",
        content:
          "Linear switches (like Cherry MX Red) press straight down with no bump — ideal for fast typists and gamers who want smooth keystrokes. Tactile switches (like Cherry MX Brown) have a slight bump at the actuation point, giving your fingers feedback without excessive noise. Clicky switches (like Cherry MX Blue) add an audible click that confirms each keystroke but can be disruptive in shared spaces. Try a switch tester before committing to a full board.",
      },
      {
        title: "Form Factor: Full-Size to 60%",
        content:
          "Full-size keyboards include a number pad and function row but consume significant desk space. Tenkeyless (TKL or 80%) removes the number pad, freeing about 4 inches of width. 65% and 60% boards go further, eliminating the function row and arrow keys (accessed via a function layer). For desk-space-constrained setups, a 65% layout offers the best balance between compactness and usable key count.",
      },
      {
        title: "Build Quality: Case and Keycap Materials",
        content:
          "Aluminum cases provide weight, rigidity, and a premium acoustic profile, while plastic cases are lighter and cheaper. For keycaps, PBT plastic resists shine and wear far better than ABS, which develops an oily sheen within months of heavy use. Double-shot keycaps have legends molded through the plastic rather than printed on, so they never fade. Gasket-mount designs dampen vibration between the plate and case for a softer, more refined typing feel.",
      },
      {
        title: "Wireless Connectivity and Battery Life",
        content:
          "Wireless mechanical keyboards use either Bluetooth or a 2.4 GHz USB dongle. Bluetooth supports multiple device pairing but can introduce slight input lag. A 2.4 GHz dongle provides near-wired responsiveness (under 1 ms lag). Battery life varies from one week to six months depending on backlighting usage. Hot-swappable boards let you change switches without soldering, which extends the keyboard's useful life across changing preferences.",
      },
    ],
    faqs: [
      {
        question: "What mechanical switch is best for typing all day?",
        answer:
          "For extended typing, tactile switches like Cherry MX Brown, Gateron Brown, or Boba U4T are widely recommended. They provide a noticeable bump at the actuation point without requiring excessive force, reducing finger fatigue over 8+ hours. Actuation force between 45g and 55g is the comfort sweet spot for most typists.",
      },
      {
        question: "Are mechanical keyboards too loud for an office?",
        answer:
          "Not necessarily. Linear switches and tactile switches with sound-dampening O-rings or silent variants (like Cherry MX Silent Red) are quieter than many membrane keyboards. Adding a desk mat under the keyboard and choosing a board with a foam-dampened case further reduces noise. Avoid clicky switches in shared workspaces.",
      },
      {
        question: "What does hot-swappable mean?",
        answer:
          "A hot-swappable keyboard allows you to pull out and replace individual switches without soldering. This means you can try different switch types, replace a faulty switch, or customize the feel of specific keys (heavier spacebar, lighter alphas) at any time. It is the most future-proof choice for anyone new to mechanical keyboards.",
      },
      {
        question: "Is a wireless mechanical keyboard good for gaming?",
        answer:
          "Modern 2.4 GHz wireless keyboards from brands like Razer, Logitech, and Wooting deliver latency under 1 ms — indistinguishable from wired. Bluetooth adds 5–15 ms of lag, which matters in competitive gaming but not in casual play or productivity. For gaming, choose a board with a dedicated 2.4 GHz dongle rather than relying on Bluetooth alone.",
      },
      {
        question: "How long do mechanical keyboard switches last?",
        answer:
          "Most mechanical switches are rated for 50–100 million keystrokes per key. At typical typing speeds, that translates to 10–20 years of daily use. Cherry MX and Gateron switches sit at the 50-million end; optical switches from Razer and others reach 100 million. Even at the lower end, a mechanical keyboard will far outlast any membrane alternative.",
      },
    ],
  },
  mice: {
    buyingGuide: [
      {
        title: "Sensor Accuracy and DPI Range",
        content:
          "Modern optical sensors (like the PixArt PAW3950 or Razer Focus Pro) offer flawless tracking with zero smoothing or acceleration. DPI determines how many pixels the cursor moves per inch of physical mouse movement. For productivity, 800–1600 DPI works well; designers may prefer 2400–3200 DPI for fine adjustments. Extremely high DPI settings (16,000+) are marketing numbers — few people use above 3200 DPI in practice.",
      },
      {
        title: "Ergonomics and Grip Style",
        content:
          "Mice are designed for three primary grip styles: palm grip (hand rests fully on the mouse), claw grip (fingers arched, palm on the back), and fingertip grip (only fingertips touch). Ergonomic mice with a vertical or angled design reduce wrist pronation, which can prevent carpal tunnel symptoms during long sessions. Your hand size matters: small mice strain large hands, and oversized mice fatigue small hands. Measure your hand length and width to find the right fit.",
      },
      {
        title: "Battery Life and Charging",
        content:
          "Wireless mice range from 70 hours to over 600 hours on a single charge, depending on sensor polling rate and LED lighting. Mice with RGB lighting drain batteries 3–5x faster. USB-C charging has replaced micro-USB in most premium models and typically delivers a full charge in under 2 hours. Some models support Qi wireless charging pads — convenient but slower. A mouse that lasts 2+ months on a charge effectively becomes charge-and-forget.",
      },
      {
        title: "Connection Type: Bluetooth vs. 2.4 GHz vs. Dual-Mode",
        content:
          "Bluetooth saves a USB port and lets you pair with multiple devices, but introduces 8–15 ms of latency. A 2.4 GHz dongle offers near-zero lag (under 1 ms) but occupies a USB-A port. Dual-mode mice give you both options, which is ideal if you switch between a desktop and a laptop. For pure productivity, Bluetooth is fine. For precision creative work or gaming, the 2.4 GHz dongle is the better choice.",
      },
    ],
    faqs: [
      {
        question: "What DPI should I set my mouse to for everyday work?",
        answer:
          "For general productivity on a single 1080p or 1440p monitor, 800–1200 DPI offers a comfortable balance of speed and precision. On a 4K display or multi-monitor setup, 1600–2400 DPI reduces the physical distance you need to move the mouse. Start at 1000 DPI and adjust up or down based on how your wrist feels after a full workday.",
      },
      {
        question: "Is an ergonomic vertical mouse actually better for my wrist?",
        answer:
          "Clinical studies show that vertical mice reduce forearm muscle activity by up to 10% compared to standard mice, which can relieve strain for people prone to repetitive stress injuries. The handshake position is more natural for the wrist. The trade-off is a learning curve of 1–2 weeks and slightly less precision in fine movements. If you have existing wrist pain, it is worth trying.",
      },
      {
        question: "How long do wireless mice batteries last?",
        answer:
          "It varies widely. Ultra-lightweight gaming mice with high polling rates may last 70–100 hours. Productivity mice with lower polling rates and no RGB often last 300–600 hours — meaning months between charges. Turning off the mouse when not in use and reducing the polling rate to 250 Hz (fine for office work) significantly extends battery life.",
      },
      {
        question: "Can I use a mouse on a glass desk without a mousepad?",
        answer:
          "Most optical sensors struggle on transparent or highly reflective surfaces. Some newer sensors (like Logitech's Darkfield technology) can track on glass, but performance still degrades compared to a cloth or hard pad. A small mousepad or desk mat is the simplest solution and also protects the mouse feet from wearing down on the glass surface.",
      },
      {
        question: "What is mouse polling rate and does it matter?",
        answer:
          "Polling rate is how often the mouse reports its position to the computer, measured in Hz. At 125 Hz the report interval is 8 ms; at 1000 Hz it is 1 ms. For office work, 125–500 Hz is perfectly adequate. For gaming or precision design, 1000 Hz is standard. Some premium gaming mice now offer 4000 Hz or 8000 Hz, but the benefit beyond 1000 Hz is negligible for most users.",
      },
    ],
  },
  monitors: {
    buyingGuide: [
      {
        title: "Panel Type: IPS vs. VA vs. OLED",
        content:
          "IPS panels offer wide viewing angles and accurate color reproduction, making them the default choice for creative professionals and programmers. VA panels deliver deeper blacks and higher contrast ratios but suffer from slower response times and color shift at wide angles. OLED monitors provide per-pixel lighting with infinite contrast and instant response, but they carry a premium price and risk of burn-in with static UI elements. For mixed productivity work, a high-end IPS panel gives the best all-around experience.",
      },
      {
        title: "Color Accuracy and Calibration",
        content:
          "If you do photo editing, video work, or design, aim for a monitor covering at least 99% sRGB and ideally 95% DCI-P3 with a Delta E under 2. Factory calibration saves you from buying a separate colorimeter — many professional monitors ship with individual calibration reports. For general productivity and coding, sRGB coverage above 95% is sufficient and color accuracy matters less than resolution and refresh rate.",
      },
      {
        title: "Refresh Rate and Response Time",
        content:
          "60 Hz is fine for spreadsheets and documents, but even for productivity work, a 120 Hz or 144 Hz panel makes scrolling, window dragging, and cursor movement noticeably smoother. Response time (measured in ms) determines how quickly pixels transition, affecting motion clarity. IPS panels typically achieve 5 ms GtG, while OLED hits under 1 ms. For creative professionals who also game, a 144 Hz IPS or OLED panel covers both use cases.",
      },
      {
        title: "Connectivity and Ergonomic Stand",
        content:
          "A single USB-C cable that carries video, data, and 90W+ power delivery simplifies your cable setup enormously — you can dock a laptop with one plug. HDMI 2.1 and DisplayPort 1.4 are necessary for 4K at high refresh rates. Built-in USB hubs and KVM switches add practical value. For the stand, look for height adjustment, tilt, swivel, and pivot (rotation to portrait mode). If you plan to use a monitor arm, a VESA-compatible mount is essential.",
      },
    ],
    faqs: [
      {
        question: "Is a 4K monitor worth it for coding and productivity?",
        answer:
          "Absolutely. At 27 inches, a 4K display delivers 163 PPI, making text razor-sharp and reducing eye strain during long reading or coding sessions. You also gain real estate — a 4K 27-inch monitor displays as much content as a 1440p 32-inch at native scaling. If your GPU can drive 4K comfortably (most integrated GPUs from 2022+ can), the upgrade is transformative.",
      },
      {
        question: "What size monitor is best for a desk setup?",
        answer:
          "27 inches is the most popular size for a primary single-monitor setup, offering a good balance of screen space and desk footprint at comfortable viewing distances (24–30 inches). 32 inches works well if you sit farther back or want more visible space without scaling. Ultrawide 34-inch monitors replace dual-monitor setups for many users. Go larger than 32 inches only if your desk depth exceeds 30 inches.",
      },
      {
        question: "Should I get an ultrawide monitor instead of two monitors?",
        answer:
          "An ultrawide (21:9 or 32:9) offers a seamless workspace without the bezel gap of dual monitors. It is excellent for video editing timelines, wide spreadsheets, and side-by-side app workflows. However, you lose the flexibility to angle monitors independently and cannot easily share one screen on a video call. If your primary workflow benefits from continuous horizontal space, an ultrawide is the better choice.",
      },
      {
        question: "How do I reduce eye strain from my monitor?",
        answer:
          "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds. Position your monitor at arm's length with the top of the screen at eye level. Reduce blue light emission using the monitor's built-in low blue light mode or OS-level night shift. Keep ambient room lighting at roughly the same brightness as your screen to avoid high contrast fatigue. Flicker-free monitors also help significantly.",
      },
      {
        question: "What cable do I need for 4K at 60 Hz or higher?",
        answer:
          "For 4K at 60 Hz, HDMI 2.0 or DisplayPort 1.2 is sufficient. For 4K at 120 Hz or 144 Hz, you need HDMI 2.1 or DisplayPort 1.4 with DSC. USB-C with DisplayPort Alt Mode (Thunderbolt 3 or 4) supports 4K at 60 Hz over a single cable. Always use certified cables — cheap unrated cables are the most common cause of flickering, dropped signal, and resolution limits.",
      },
    ],
  },
  lighting: {
    buyingGuide: [
      {
        title: "Color Temperature Range",
        content:
          "Desk lights with adjustable color temperature let you shift from warm 2700K light (relaxing, easier on the eyes in the evening) to cool 6500K daylight (energizing, better color accuracy for design work). A range of at least 3000K–5000K covers most home office needs. Lights that lock you into a single temperature force you to compromise — avoid them if your work varies between day and night sessions.",
      },
      {
        title: "Brightness Levels and CRI",
        content:
          "Task lighting should deliver at least 500 lux at desk level for comfortable reading and computer work. Look for lights with multiple brightness steps (10+ levels or continuous dimming) rather than just high/low. Color Rendering Index (CRI) measures how accurately a light renders colors: 90+ CRI is excellent for creative work, while 80+ is acceptable for general productivity. High CRI makes a noticeable difference in how your webcam image looks on video calls.",
      },
      {
        title: "Monitor Light Bars vs. Traditional Desk Lamps",
        content:
          "Monitor light bars (also called screen bars) clip to the top of your monitor and cast light downward onto your desk without creating screen glare — a major advantage over traditional desk lamps. They take up zero desk space and illuminate the keyboard area evenly. Traditional desk lamps offer more flexibility in positioning and often provide broader ambient light. If you primarily need to light your desk for typing and reading, a monitor bar is the cleaner solution.",
      },
      {
        title: "Flicker Rate and Eye Health",
        content:
          "Cheap LED desk lights can flicker at frequencies that cause headaches and eye fatigue, even if the flicker is not visible. IEEE standard PAR1789 recommends LED flicker above 1250 Hz to avoid biological effects. Quality desk lights specify their flicker rating — look for flicker-free certifications. This is especially important if you spend 6+ hours at your desk, as cumulative exposure to low-frequency flicker compounds eye strain over time.",
      },
    ],
    faqs: [
      {
        question: "Are monitor light bars better than desk lamps?",
        answer:
          "For most desk setups, yes. Monitor light bars eliminate glare on your screen, take up no desk space, and focus light exactly where you need it — on your keyboard and documents. Desk lamps are better if you need broader room illumination or a light source you can move around. Many people use both: a light bar for task lighting and a small lamp for ambient fill.",
      },
      {
        question: "What color temperature is best for working at a desk?",
        answer:
          "For daytime productivity, 4000K–5000K (neutral to cool white) promotes alertness and color accuracy. In the evening, shift down to 2700K–3500K to reduce blue light exposure and support your circadian rhythm. Lights with auto-dimming or scheduled temperature changes handle this transition automatically. Avoid working under 6500K cool light late at night, as it can disrupt sleep quality.",
      },
      {
        question: "How bright should my desk light be?",
        answer:
          "The Illuminating Engineering Society recommends 300–500 lux for general office tasks and 500–1000 lux for detailed work like reading fine print or soldering. Most quality desk lights produce 400–1000 lux at 20 inches, which covers the typical desk-to-light distance. Start at a moderate setting and increase only if you feel strain — overly bright light is as fatiguing as dim light.",
      },
      {
        question: "Do LED desk lights produce harmful blue light?",
        answer:
          "LED lights do emit blue wavelengths, but the exposure from a desk lamp is a fraction of what your monitor produces. The more important factor is color temperature: warm white LEDs (2700K–3000K) emit far less blue light than cool white (5000K+). Using a warm setting in the evening mitigates most concerns. If you are sensitive, look for lights with built-in blue light filtering modes.",
      },
      {
        question: "Can desk lighting improve my video call appearance?",
        answer:
          "Dramatically, yes. Front-facing light at 4000K–5000K even out facial shadows and give your webcam sensor enough light to produce a sharp, noise-free image. Position the light slightly above your face and in front of you, never behind. A monitor light bar combined with a ring light or key light is the standard setup recommended by streamers and remote professionals alike.",
      },
    ],
  },
  "cable-management": {
    buyingGuide: [
      {
        title: "Under-Desk Cable Trays",
        content:
          "Cable trays mount beneath your desk and catch all the cables, power strips, and adapters that would otherwise dangle or pile on the floor. Metal mesh trays are the most durable and support heavier loads (multiple chargers, surge protectors), while plastic J-channels are lighter and quieter. Trays that screw into the desk offer the strongest hold; adhesive-mounted trays are easier to install but can slip under weight over time. Size the tray to fit your desk width minus 6 inches on each side.",
      },
      {
        title: "Cable Sleeves and Wraps",
        content:
          "Cable sleeves bundle multiple cables into a single, clean conduit that runs from your desk to the wall or power source. Split sleeves with a side opening let you add or remove cables without disconnecting them. Spiral wraps are flexible and expandable but less visually clean. Neoprene sleeves offer the best mix of flexibility and appearance. Use them for the vertical cable run from tray to floor outlet — this is typically the most visible cable stretch.",
      },
      {
        title: "Magnetic and Adhesive Cable Clips",
        content:
          "Small cable clips keep individual charging cables, headphone cords, and USB cables anchored to the edge of your desk so they do not slide off when unplugged. Magnetic clips offer the strongest hold and the cleanest removal. Adhesive-backed silicone clips are cheaper but leave residue and lose grip over time. Position clips on the desk edge nearest your hand so cables are always within reach without searching.",
      },
      {
        title: "Power Strip Placement and Cable Routing",
        content:
          "The single best cable management move is mounting your power strip under the desk rather than leaving it on the floor. This shortens every cable run and eliminates the tangle of cords reaching down to the ground. Use a surge protector with widely spaced outlets to accommodate charger bricks. Route cables along desk legs using adhesive cable clips, and use Velcro ties (never zip ties) at 12-inch intervals so you can adjust later without cutting anything.",
      },
    ],
    faqs: [
      {
        question: "What is the best way to start organizing desk cables?",
        answer:
          "Start by unplugging everything and identifying each cable. Group cables by destination: power cables go to the surge protector, data cables go to the computer. Mount a cable tray under the desk, place the power strip inside it, and use cable sleeves for the tray-to-floor run. Add clips for individual cables that need to be plugged and unplugged frequently. The whole process takes about 30 minutes for a typical desk.",
      },
      {
        question: "Are adhesive cable clips strong enough to hold cables?",
        answer:
          "For lightweight cables like USB-C and Lightning, adhesive clips work fine on smooth surfaces. For heavier cables or power cords, they tend to fail within a few months, especially in warm environments where adhesive softens. Magnetic clips or screw-mounted clips are more reliable for anything heavier than a phone charger cable. If you do use adhesive clips, clean the surface with isopropyl alcohol first for the best bond.",
      },
      {
        question: "Should I use zip ties or Velcro ties for cable management?",
        answer:
          "Velcro ties are almost always the better choice. They are reusable, adjustable, and do not require cutting to remove — which means you can add or remove cables from a bundle without destroying the tie. Zip ties are permanent and can damage cable insulation if over-tightened. The only scenario where zip ties are preferred is semi-permanent installations where cables will never change, like inside a server rack.",
      },
      {
        question: "How do I manage cables with a standing desk that moves up and down?",
        answer:
          "Use a cable management spine — a flexible, segmented tube that compresses and extends as the desk moves. Attach one end to the underside of the desk and the other near the floor outlet. Combined with an under-desk tray to hold the power strip, a cable spine prevents cables from snagging, unplugging, or getting caught in the desk mechanism during height transitions.",
      },
      {
        question: "What is the best cable management solution for a minimalist setup?",
        answer:
          "For a true minimalist look, switch to wireless peripherals where possible (keyboard, mouse, headset). Mount a slim cable tray under the desk for the power strip and any remaining wired connections. Run a single neoprene cable sleeve from the tray to the wall outlet. Use a monitor with USB-C power delivery to eliminate the laptop charger entirely. Wireless charging pads can replace most of the remaining phone and earbud cables on your desk surface.",
      },
    ],
  },
};

export function getCategoryContent(slug: string): CategoryContent {
  return content[slug] || { buyingGuide: [], faqs: [] };
}
