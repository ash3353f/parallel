"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface LampAccessExperienceProps {
  onAccessGranted: () => void;
}

export const LampAccessExperience: React.FC<LampAccessExperienceProps> = ({ onAccessGranted }) => {
  const [isOn, setIsOn] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isGone, setIsGone] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("parallel_accessed") === "1";
    }
    return false;
  });
  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [shake, setShake] = useState(false);
  const [passState, setPassState] = useState<"idle" | "err" | "ok">("idle");
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Cord Drag State
  const [cordOffset, setCordOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);

  useEffect(() => {
    if (isGone) {
      onAccessGranted();
    }
  }, [isGone, onAccessGranted]);

  const triggerToggleLamp = () => {
    setIsOn((prev) => !prev);
  };

  const handleCordMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startYRef.current = clientY;
  };

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const dy = Math.max(0, Math.min(80, clientY - startYRef.current));
      setCordOffset(dy);
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      if (cordOffset > 24) {
        triggerToggleLamp();
      }
      setCordOffset(0);
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [cordOffset]);

  const handleDigitChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const nextPass = [...passcode];
    nextPass[index] = val.slice(-1);
    setPasscode(nextPass);

    if (val && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (nextPass.every((d) => d !== "")) {
      verifyPasscode(nextPass.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !passcode[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyPasscode = (codeStr: string) => {
    if (codeStr === "0000" || codeStr === "1234" || codeStr === "9999") {
      setPassState("ok");
      setTimeout(() => {
        grantAccess();
      }, 400);
    } else {
      setPassState("err");
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setPassState("idle");
        setPasscode(["", "", "", ""]);
        inputRefs[0].current?.focus();
      }, 600);
    }
  };

  const grantAccess = () => {
    setIsRevealing(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("parallel_accessed", "1");
    }
    setTimeout(() => {
      setIsGone(true);
      onAccessGranted();
    }, 900);
  };

  if (isGone) return null;

  return (
    <div
      className={`lamp ${isOn ? "on" : ""} ${isRevealing ? "revealing" : ""} ${
        isGone ? "gone" : ""
      }`}
    >
      <div className="vignette" />

      {/* Skip Button */}
      <button onClick={grantAccess} className="lamp-skip">
        Skip Intro →
      </button>

      {/* Lamp Light Cone & Floor Pool */}
      <div className="lamp-light" />
      <div className="lamp-pool" />

      {/* Dust Particles */}
      <div className="dust">
        {Array.from({ length: 12 }).map((_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 23) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="lamp-stage">
        {/* Lamp Fixture & Pull Cord */}
        <div className="lamp-obj">
          <div className="shade">
            <div className="face">
              <div className="eye" />
              <div className="eye" />
            </div>
          </div>
          <div className="shade-glow" />
          <div className="neck" />
          <div className="base" />

          {/* Pull Cord */}
          <div
            className="cord"
            style={{
              height: `${64 + cordOffset}px`,
              transform: `rotate(${cordOffset * 0.15}deg)`,
            }}
            onMouseDown={handleCordMouseDown}
            onTouchStart={handleCordMouseDown}
          >
            <div className="knob" />
          </div>

          <div className="cord-hint">↓ Pull cord</div>

          {/* Accessibility Lamp Switch */}
          <div className="lamp-a11y">
            <button onClick={triggerToggleLamp}>
              {isOn ? "Turn Off Lamp" : "Turn On Lamp"}
            </button>
          </div>
        </div>

        {/* Passcode Panel */}
        <div className={`pass ${shake ? "shake" : ""}`}>
          <span className="ey">Access Gate</span>
          <h3>Parallel OS</h3>
          <p>Pull the cord above to illuminate, then enter key to access the Digital Twin.</p>

          <div className="digits">
            {passcode.map((d, i) => (
              <input
                key={i}
                ref={inputRefs[i]}
                type="password"
                maxLength={1}
                value={d}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={passState === "err" ? "err" : passState === "ok" ? "ok" : ""}
                placeholder="•"
              />
            ))}
          </div>

          <div className="text-center">
            <span className="hint">
              Demo passcode: <b>0000</b>
            </span>
          </div>

          <button
            onClick={() => verifyPasscode(passcode.join(""))}
            className="btn btn-cyan submit"
          >
            <span>Authenticate</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Spatial Burst FX */}
      <div className="burst" />
    </div>
  );
};
