// Add to app/globals.css
@keyframes wave {
  0% {
    clip-path: polygon(
      0% 50%,
      2% 45%, 4% 42%, 6% 40%, 8% 40%, 10% 42%, 12% 45%, 14% 50%,
      16% 55%, 18% 58%, 20% 60%, 22% 60%, 24% 58%, 26% 55%, 28% 50%,
      30% 45%, 32% 42%, 34% 40%, 36% 40%, 38% 42%, 40% 45%, 42% 50%,
      44% 55%, 46% 58%, 48% 60%, 50% 60%, 52% 58%, 54% 55%, 56% 50%,
      58% 45%, 60% 42%, 62% 40%, 64% 40%, 66% 42%, 68% 45%, 70% 50%,
      72% 55%, 74% 58%, 76% 60%, 78% 60%, 80% 58%, 82% 55%, 84% 50%,
      86% 45%, 88% 42%, 90% 40%, 92% 40%, 94% 42%, 96% 45%, 98% 50%, 100% 50%,
      100% 100%, 0% 100%
    );
  }
  50% {
    clip-path: polygon(
      0% 40%,
      2% 35%, 4% 32%, 6% 30%, 8% 30%, 10% 32%, 12% 35%, 14% 40%,
      16% 45%, 18% 48%, 20% 50%, 22% 50%, 24% 48%, 26% 45%, 28% 40%,
      30% 35%, 32% 32%, 34% 30%, 36% 30%, 38% 32%, 40% 35%, 42% 40%,
      44% 45%, 46% 48%, 48% 50%, 50% 50%, 52% 48%, 54% 45%, 56% 40%,
      58% 35%, 60% 32%, 62% 30%, 64% 30%, 66% 32%, 68% 35%, 70% 40%,
      72% 45%, 74% 48%, 76% 50%, 78% 50%, 80% 48%, 82% 45%, 84% 40%,
      86% 35%, 88% 32%, 90% 30%, 92% 30%, 94% 32%, 96% 35%, 98% 40%, 100% 40%,
      100% 100%, 0% 100%
    );
  }
  100% {
    clip-path: polygon(
      0% 50%,
      2% 45%, 4% 42%, 6% 40%, 8% 40%, 10% 42%, 12% 45%, 14% 50%,
      16% 55%, 18% 58%, 20% 60%, 22% 60%, 24% 58%, 26% 55%, 28% 50%,
      30% 45%, 32% 42%, 34% 40%, 36% 40%, 38% 42%, 40% 45%, 42% 50%,
      44% 55%, 46% 58%, 48% 60%, 50% 60%, 52% 58%, 54% 55%, 56% 50%,
      58% 45%, 60% 42%, 62% 40%, 64% 40%, 66% 42%, 68% 45%, 70% 50%,
      72% 55%, 74% 58%, 76% 60%, 78% 60%, 80% 58%, 82% 55%, 84% 50%,
      86% 45%, 88% 42%, 90% 40%, 92% 40%, 94% 42%, 96% 45%, 98% 50%, 100% 50%,
      100% 100%, 0% 100%
    );
  }
}

.wave-bg {
  background: linear-gradient(135deg, #0a0e27 0%, #1a2847 100%);
  position: relative;
}

.wave-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 212, 255, 0.1), rgba(255, 69, 0, 0.1));
  animation: wave 20s ease-in-out infinite;
  pointer-events: none;
}




// Add to app/globals.css
@keyframes float1 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(30px, -50px); }
  66% { transform: translate(-20px, 50px); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-40px, 60px); }
  66% { transform: translate(50px, -30px); }
}

.orb-bg {
  background: linear-gradient(135deg, #0a0e27 0%, #1a2847 100%);
  position: relative;
  overflow: hidden;
}

.orb-bg::before,
.orb-bg::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
}

.orb-bg::before {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.5), transparent);
  top: -100px;
  right: -100px;
  animation: float1 15s ease-in-out infinite;
}

.orb-bg::after {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.4), transparent);
  bottom: -50px;
  left: -50px;
  animation: float2 18s ease-in-out infinite;
}


// Add to app/globals.css
.mesh-gradient-bg {
  background: linear-gradient(45deg, #0a0e27, #1a2847);
  position: relative;
  background-size: 200% 200%;
  animation: meshFlow 10s ease infinite;
}

@keyframes meshFlow {
  0% {
    background: linear-gradient(45deg, #0a0e27, #1a2847);
  }
  25% {
    background: linear-gradient(45deg, #1a2847, #2d1b4e);
  }
  50% {
    background: linear-gradient(45deg, #2d1b4e, #3d1a5c);
  }
  75% {
    background: linear-gradient(45deg, #3d1a5c, #1a2847);
  }
  100% {
    background: linear-gradient(45deg, #0a0e27, #1a2847);
  }
}





@keyframes float1 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(30px, -50px); }
  66% { transform: translate(-20px, 50px); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-40px, 60px); }
  66% { transform: translate(50px, -30px); }
}

.hero-bg-animated {
  background: linear-gradient(135deg, #0a0e27 0%, #1a2847 100%);
  position: relative;
  overflow: hidden;
}

.hero-bg-animated::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent);
  top: -100px;
  right: -100px;
  border-radius: 50%;
  filter: blur(60px);
  animation: float1 15s ease-in-out infinite;
}

.hero-bg-animated::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.2), transparent);
  bottom: -50px;
  left: -50px;
  border-radius: 50%;
  filter: blur(60px);
  animation: float2 18s ease-in-out infinite;
}