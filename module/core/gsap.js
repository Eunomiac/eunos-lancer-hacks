/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌█░░░░░░░░░ Euno's Hacks for Lancer for Foundry VTT ░░░░░░░░░░░█▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█  License █ v0.1 ██▐     *|
|*     ▌████░░░░  ░░░░█████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */
/* @@DOUBLE-BLANK@@ ~*/
import U from "./utilities.js";
import C from "./constants.js";
import { Flip, TextPlugin, Draggable as Dragger, MotionPathPlugin, Observer, CustomEase } from "../libraries.js";
const gsapPlugins = [
    TextPlugin,
    Flip,
    MotionPathPlugin,
    Dragger,
    Observer,
    CustomEase,
];
export const gsapEffects = {
    keyDrop: {
        effect: (clockKey, config) => {
            const [keyContainer] = $(clockKey).closest(".clock-key-container");
            return U.gsap.timeline({
                onComplete() {
                    if (config.callback) {
                        config.callback();
                    }
                }
            })
                .fromTo(keyContainer, {
                y: config.yShift
            }, {
                y: 0,
                autoAlpha: 1,
                ease: "bounce",
                duration: config.duration
            });
        },
        defaults: {
            duration: 1,
            yShift: -800
        },
        extendTimeline: true
    },
    keyPull: {
        effect: (clockKey, config) => {
            const [keyContainer] = $(clockKey).closest(".clock-key-container");
            return U.gsap.timeline({
                onComplete() {
                    if (config.callback) {
                        config.callback();
                    }
                }
            })
                .to(keyContainer, {
                y: config.yDelta,
                ease: config.ease,
                duration: 0.75 * config.duration
            })
                .to(keyContainer, {
                opacity: 0,
                ease: "power2.out",
                duration: 0.25 * config.duration
            }, 0.75 * config.duration);
        },
        defaults: {
            yDelta: -800,
            duration: 1,
            ease: "back.in(1)"
        },
        extendTimeline: true
    },
    keyControlPanelFlip: {
        effect: (target, config) => {
            return U.gsap.timeline({
                delay: config.delay,
                onStart() {
                    if (target) {
                        const target$ = $(target);
                        const nextSibling$ = target$.next(".clock-control-flipper");
                        if (nextSibling$.length) {
                            U.gsap.effects.keyControlPanelFlip(nextSibling$[0], {
                                ...config,
                                delay: 0.15
                            });
                        }
                    }
                }
            })
                .to(target, {
                rotateX: config.angle,
                duration: 0.5,
                ease: "back.inOut(2)"
            });
        },
        defaults: {
            angle: 180,
            delay: 0
        },
        extendTimeline: true
    },
    csqEnter: {
        effect: (csqContainer, config) => {
            const csqRoot = U.gsap.utils.selector(csqContainer);
            const csqIconCircle = csqRoot(".consequence-icon-circle.base-consequence");
            const csqBaseTypeElem = csqRoot(".consequence-type.base-consequence");
            const csqAcceptTypeElem = csqRoot(".consequence-type.accept-consequence");
            const csqBaseNameElem = csqRoot(".consequence-name.base-consequence");
            const csqAcceptNameElem = csqRoot(".consequence-name.accept-consequence");
            const tl = U.gsap.timeline({ paused: true, defaults: {} });
            if (csqAcceptTypeElem.length > 0) {
                tl.set(csqAcceptTypeElem, { opacity: 0 }, 0);
            }
            if (csqAcceptNameElem.length > 0) {
                tl.set(csqAcceptNameElem, { opacity: 0 }, 0);
            }
            if (csqBaseTypeElem.length > 0) {
                tl.fromTo(csqBaseTypeElem, {
                    opacity: 1
                }, {
                    opacity: 0,
                    duration: 0.25,
                    ease: "sine"
                }, 0);
            }
            if (csqAcceptTypeElem.length > 0) {
                tl.fromTo(csqAcceptTypeElem, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.25,
                    ease: "sine"
                }, 0);
            }
            if (csqBaseNameElem.length > 0) {
                tl.fromTo(csqBaseNameElem, {
                    opacity: 1
                }, {
                    opacity: 0,
                    duration: 0.25,
                    ease: "sine"
                }, 0);
            }
            if (csqAcceptNameElem.length > 0) {
                tl.fromTo(csqAcceptNameElem, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.25,
                    ease: "sine"
                }, 0);
            }
            if (csqContainer) {
                tl.fromTo(csqContainer, {
                    filter: "brightness(1)"
                }, {
                    filter: `brightness(${config.brightness})`,
                    duration: config.duration / 3,
                    ease: "none"
                }, 0);
            }
            if (csqIconCircle.length > 0) {
                tl.fromTo(csqIconCircle, {
                    scale: 0.75,
                    outlineColor: C.Colors.dBLACK,
                    outlineWidth: 0
                }, {
                    scale: 0.85,
                    outlineColor: C.Colors.GREY,
                    outlineWidth: 1,
                    duration: 0.55,
                    ease: "sine.out"
                }, 0);
            }
            return tl;
        },
        defaults: {
            brightness: 1.5,
            duration: 0.5,
            scale: 1.5,
            stagger: 0.05,
            ease: "sine",
            easeStrength: 1.5
        }
    },
    csqClickIcon: {
        effect: (csqIconContainer, config) => {
            const csqContainer = $(csqIconContainer).closest(".comp.consequence-display-container");
            const csqRoot = U.gsap.utils.selector(csqContainer[0]);
            const iconRoot = U.gsap.utils.selector(csqIconContainer);
            const csqBackgroundImg = csqRoot(".consequence-bg-image");
            const csqInteractionPads = csqRoot(".consequence-interaction-pad");
            const csqIconCircleBase = iconRoot(".consequence-icon-circle.base-consequence");
            const csqIconCircleAccept = iconRoot(".consequence-icon-circle.accept-consequence");
            const csqButtonContainers = iconRoot(".consequence-button-container");
            const tl = U.gsap.timeline({
                paused: true,
                onComplete: function () {
                    $(csqInteractionPads).css("pointerEvents", "auto");
                },
                onReverseComplete: function () {
                    $(csqInteractionPads).css("pointerEvents", "none");
                }
            });
            if (csqBackgroundImg.length) {
                tl.fromTo(csqBackgroundImg, {
                    xPercent: 110,
                    yPercent: -50
                }, {
                    xPercent: -60,
                    yPercent: -50,
                    duration: 0.5,
                    ease: "back"
                }, 0);
            }
            if (csqIconCircleBase.length > 0) {
                tl.fromTo(csqIconCircleBase, {
                    opacity: 1
                }, {
                    opacity: 0,
                    duration: 0.25,
                    ease: "sine.out"
                }, 0);
            }
            if (csqIconCircleAccept.length > 0) {
                tl.fromTo(csqIconCircleAccept, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.15,
                    ease: "sine"
                }, 0)
                    .fromTo(csqIconCircleAccept, {
                    outlineWidth: 1,
                    scale: 0.85
                }, {
                    outlineWidth: 2,
                    scale: 1,
                    duration: 0.25,
                    ease: "sine"
                }, 0.175);
            }
            if (csqButtonContainers.length > 0) {
                tl.fromTo(csqButtonContainers, {
                    scale: config.scale,
                    opacity: 0,
                    filter: "blur(25px)"
                }, {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    stagger: config.stagger,
                    duration: config.duration,
                    ease: `${config.ease}.inOut(${config.easeStrength})`
                }, 0);
            }
            return tl;
        },
        defaults: {
            duration: 0.5,
            scale: 1.5,
            stagger: 0.05,
            ease: "sine",
            easeStrength: 1.5
        }
    },
    csqEnterRight: {
        effect: (csqContainer) => {
            const csqRoot = U.gsap.utils.selector(csqContainer);
            const typeLine = csqRoot(".consequence-type-container .consequence-type.accept-consequence");
            const typeLineBg = csqRoot(".consequence-type-container .consequence-type-bg.accept-consequence");
            const buttonRoot = U.gsap.utils.selector(csqRoot(".consequence-button-container.consequence-accept-button-container"));
            const buttonBg = buttonRoot(".consequence-button-bg");
            const buttonIcon = buttonRoot(".button-icon i");
            const buttonLabel = buttonRoot(".consequence-button-label");
            const tl = U.gsap.timeline({ paused: true, defaults: {} });
            if (typeLine.length > 0) {
                tl.fromTo(typeLine, {
                    color: C.Colors.RED
                }, {
                    color: C.Colors.WHITE,
                    duration: 0.5,
                    ease: "sine.inOut"
                }, 0);
            }
            if (typeLineBg.length > 0) {
                tl.fromTo(typeLineBg, {
                    x: 5,
                    scaleX: 0,
                    color: C.Colors.RED,
                    skewX: 0
                }, {
                    scaleX: 1,
                    skewX: -45,
                    color: C.Colors.RED,
                    duration: 0.5,
                    ease: "back.out"
                }, 0);
            }
            if (buttonBg.length > 0) {
                tl.fromTo(buttonBg, {
                    scaleX: 0,
                    color: C.Colors.RED,
                    skewX: 0
                }, {
                    x: 0,
                    scaleX: 1,
                    skewX: -45,
                    color: C.Colors.RED,
                    duration: 0.25,
                    ease: "back.out"
                }, 0);
            }
            if (buttonIcon.length > 0) {
                tl.fromTo(buttonIcon, {
                    color: C.Colors.GREY,
                    opacity: 0.75,
                    scale: 1
                }, {
                    color: C.Colors.dBLACK,
                    scale: 1.25,
                    opacity: 1,
                    duration: 0.5,
                    ease: "sine"
                }, 0);
            }
            if (buttonLabel.length > 0) {
                tl.fromTo(buttonLabel, {
                    color: C.Colors.GREY,
                    fontWeight: 400,
                    scale: 1
                }, {
                    color: C.Colors.dBLACK,
                    fontWeight: 800,
                    duration: 0.75,
                    ease: "sine"
                }, 0);
            }
            return tl;
        },
        defaults: {}
    },
    csqEnterLeft: {
        effect: (csqContainer) => {
            const csqRoot = U.gsap.utils.selector(csqContainer);
            const typeLine = csqRoot(".consequence-type-container .consequence-type.accept-consequence");
            const nameLine = csqRoot(".consequence-name-container .consequence-name.accept-consequence");
            const acceptIconCircle = csqRoot(".consequence-icon-circle.accept-consequence");
            const acceptButton = csqRoot(".consequence-button-container.consequence-accept-button-container");
            const tl = U.gsap.timeline({ paused: true, defaults: {} });
            if (typeLine.length > 0) {
                tl.to(typeLine, {
                    opacity: 0,
                    duration: 0.15,
                    ease: "sine.inOut"
                }, 0);
            }
            if (nameLine.length > 0) {
                tl.to(nameLine, {
                    opacity: 0,
                    duration: 0.15,
                    ease: "sine.inOut"
                }, 0);
            }
            if (acceptIconCircle.length > 0) {
                tl.to(acceptIconCircle, {
                    opacity: 0,
                    duration: 0.15,
                    ease: "sine.inOut"
                }, 0);
            }
            if (acceptButton.length > 0) {
                tl.fromTo(acceptButton, {
                    opacity: 1
                }, {
                    opacity: 0,
                    duration: 0.25,
                    ease: "sine.inOut"
                }, 0);
            }
            return tl;
        },
        defaults: {}
    },
    csqEnterSubLeft: {
        effect: (csqContainer, config) => {
            const csqRoot = U.gsap.utils.selector(csqContainer);
            const iconCircle = csqRoot(`.consequence-icon-circle.${config.type}-consequence`);
            const typeLine = csqRoot(`.consequence-type-container .consequence-type.${config.type}-consequence`);
            const nameLine = csqRoot(`.consequence-name.${config.type}-consequence`);
            const footerBg = csqRoot(`.consequence-footer-container .consequence-footer-bg.${config.type}-consequence`);
            const specialFooterMsg = csqRoot(`.consequence-footer-container .consequence-footer-message.${config.type}-consequence`);
            const tl = U.gsap.timeline({ paused: true, defaults: {} });
            if (iconCircle.length > 0) {
                tl.fromTo(iconCircle, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out"
                }, 0);
            }
            if (typeLine.length > 0) {
                tl.fromTo(typeLine, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out"
                }, 0);
            }
            if (nameLine.length > 0) {
                tl.fromTo(nameLine, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    duration: 0.5,
                    ease: "back.inOut"
                }, 0);
            }
            if (footerBg.length > 0) {
                tl.fromTo(footerBg, {
                    scaleX: 0,
                    skewX: 0,
                    opacity: 1
                }, {
                    scaleX: 1,
                    skewX: -45,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.inOut"
                }, 0);
            }
            if (specialFooterMsg.length > 0) {
                tl.fromTo(specialFooterMsg, {
                    scaleX: 0,
                    opacity: 1
                }, {
                    scaleX: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.inOut"
                }, 0);
            }
            if (csqRoot(`.consequence-button-container.consequence-${config.type}-button-container`).length > 0) {
                const buttonRoot = U.gsap.utils.selector(csqRoot(`.consequence-button-container.consequence-${config.type}-button-container`));
                const buttonBg = buttonRoot(".consequence-button-bg");
                const buttonIcon = buttonRoot(".button-icon i");
                const buttonLabel = buttonRoot(".consequence-button-label");
                if (buttonBg.length > 0) {
                    tl.fromTo(buttonBg, {
                        scaleX: 0,
                        skewX: 0,
                        opacity: 1
                    }, {
                        scaleX: 1,
                        skewX: -45,
                        opacity: 1,
                        duration: 0.5,
                        ease: "back.inOut"
                    }, 0);
                }
                if (buttonIcon.length > 0) {
                    tl.fromTo(buttonIcon, {
                        color: C.Colors.GREY,
                        opacity: 0.75,
                        scale: 1
                    }, {
                        color: C.Colors.dBLACK,
                        scale: 1.25,
                        opacity: 1,
                        duration: 0.5,
                        ease: "sine"
                    }, 0);
                }
                if (buttonLabel.length > 0) {
                    tl.fromTo(buttonLabel, {
                        color: C.Colors.GREY,
                        fontWeight: 400,
                        scale: 1
                    }, {
                        color: C.Colors.dBLACK,
                        fontWeight: 800,
                        duration: 0.75,
                        ease: "sine"
                    }, 0);
                }
            }
            return tl;
        },
        defaults: {}
    },
    fillCoins: {
        effect: (targets, config) => {
            return U.gsap.to(targets, {
                duration: config.duration / 2,
                scale: config.scale,
                filter: config.filter,
                ease: config.ease,
                stagger: {
                    amount: 0.25,
                    from: "start",
                    repeat: 1,
                    yoyo: true
                }
            });
        },
        defaults: {
            duration: 1,
            scale: 1,
            filter: "saturate(1) brightness(2)",
            ease: "power2.in"
        },
        extendTimeline: true
    },
    blurRemove: {
        effect: (targets, config) => U.gsap.timeline({ stagger: config.stagger })
            .to(targets, {
            skewX: config.skewX,
            duration: config.duration / 2,
            ease: "power4.out"
        })
            .to(targets, {
            x: config.x,
            marginBottom: config.ignoreMargin
                ? undefined
                : function (i, target) {
                    return U.get(target, "height") * -1;
                },
            marginRight: config.ignoreMargin
                ? undefined
                : function (i, target) {
                    return U.get(target, "width") * -1;
                },
            scale: config.scale,
            filter: `blur(${config.blur}px)`,
            duration: (3 / 4) * config.duration
        }, config.duration / 4)
            .to(targets, {
            autoAlpha: 0,
            duration: config.duration / 2,
            ease: "power3.in"
        }, config.duration / 2),
        defaults: {
            ignoreMargin: false,
            skewX: -20,
            duration: 0.5,
            x: "+=300",
            scale: 1.5,
            blur: 10,
            stagger: 0
        },
        extendTimeline: true
    },
    blurReveal: {
        effect: (targets, config) => U.gsap.timeline()
            .fromTo(targets, {
            x: config.x,
            marginBottom: config.ignoreMargin
                ? undefined
                : function (i, target) {
                    return U.get(target, "height") * -1;
                },
            marginRight: config.ignoreMargin
                ? undefined
                : function (i, target) {
                    return U.get(target, "width") * -1;
                },
            scale: config.scale,
            filter: `blur(${config.blur}px)`
        }, {
            x: 0,
            marginBottom: 0,
            marginRight: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: (3 / 4) * config.duration
        }, 0)
            .fromTo(targets, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            duration: config.duration / 2,
            ease: "power3.in"
        }, 0)
            .fromTo(targets, {
            skewX: config.skewX
        }, {
            skewX: 0,
            duration: config.duration / 2,
            ease: "power4.out"
        }, config.duration / 2),
        defaults: {
            ignoreMargin: false,
            skewX: -20,
            duration: 0.5,
            x: "+=300",
            scale: 1.5,
            blur: 10
        },
        extendTimeline: true
    },
    scaleUpReveal: {
        effect: (target, config) => {
            const tl = U.gsap.timeline()
                .fromTo(target, {
                autoAlpha: 0,
                scale: 0.5 * config.scale
            }, {
                autoAlpha: 1,
                scale: config.scale,
                duration: config.duration,
                ease: config.ease
            });
            return tl;
        },
        defaults: {
            scale: 1,
            duration: 0.5,
            ease: "power2"
        },
        extendTimeline: true
    },
    scaleDownRemove: {
        effect: (target, config) => {
            const tl = U.gsap.timeline()
                .to(target, {
                autoAlpha: 0,
                scale: 0.5 * config.scale,
                duration: config.duration,
                ease: config.ease
            });
            return tl;
        },
        defaults: {
            scale: 1,
            duration: 0.5,
            ease: "power2"
        },
        extendTimeline: true
    },
    blurRevealTooltip: {
        effect: (target, config) => {
            if (!target) {
                throw new Error(`blurRevealTooltip effect: tooltip element is ${target === null ? "null" : typeof target}`);
            }
            const tooltip$ = $(target);
            return U.gsap.timeline({
                paused: true,
                onReverseComplete: config.onReverseComplete
            })
                .fromTo(tooltip$, {
                filter: `blur(${config.blurStrength}px)`,
                autoAlpha: 0,
                xPercent: 50,
                yPercent: -200,
                scale: config.scale
            }, {
                filter: "blur(0px)",
                autoAlpha: 1,
                xPercent: -50,
                yPercent: -100,
                scale: 1,
                ease: config.ease,
                duration: config.duration
            });
        },
        defaults: {
            scale: 1.5,
            blurStrength: 15,
            ease: "back.out",
            duration: 0.25,
            onReverseComplete: undefined
        },
        extendTimeline: true
    },
    textJitter: {
        effect: (target, config) => {
            const [targetElem] = $(target);
            if (!targetElem) {
                throw new Error("textJitter effect: target not found");
            }
            const split = new SplitText(targetElem, { type: "chars" });
            return U.gsap.timeline()
                .to(targetElem, {
                autoAlpha: 1,
                duration: config.duration,
                ease: "none"
            })
                .fromTo(split.chars, {
                y: -config.yAmp
            }, {
                y: config.yAmp,
                duration: config.duration,
                ease: "sine.inOut",
                stagger: {
                    repeat: -1,
                    yoyo: true,
                    from: "random",
                    each: config.stagger
                }
            }, 0)
                .fromTo(split.chars, {
                rotateZ: -config.rotateAmp
            }, {
                rotateZ: config.rotateAmp,
                duration: config.duration,
                ease: CustomWiggle.create("myWiggle", { wiggles: 10, type: "random" }),
                stagger: {
                    repeat: -1,
                    from: "random",
                    yoyo: true,
                    each: config.stagger
                }
            }, 0);
        },
        defaults: {
            yAmp: 2,
            rotateAmp: 2,
            duration: 1,
            stagger: 0.05
        },
        extendTimeline: true
    }
};
export function Initialize() {
    if (gsapPlugins.length) {
        U.gsap.config({
            nullTargetWarn: true
        });
        U.gsap.registerPlugin(...gsapPlugins);
        Object.assign(globalThis, {
            TextPlugin,
            Flip,
            MotionPathPlugin,
            Dragger,
            Observer,
            CustomEase,
        });
    }
    Object.entries(gsapEffects).forEach(([name, effect]) => {
        U.gsap.registerEffect(Object.assign(effect, { name }));
    });
}
export function ApplyTooltipAnimations(html) {
    html.find(".tooltip-trigger").each((_, el) => {
        const tooltipElem = $(el).find(".tooltip")[0] ?? $(el).next(".tooltip")[0];
        if (!tooltipElem) {
            return;
        }
        const tooltip$ = $(tooltipElem);
        const tooltipContainer$ = tooltip$.parent();
        if (tooltipContainer$.css("position") !== "relative"
            && tooltipContainer$.css("position") !== "absolute") {
            tooltipContainer$.css("position", "relative");
        }
        tooltip$.css("position", "absolute");
        const tooltipID = `tooltip-${randomID()}`;
        tooltip$.attr("id", tooltipID);
        if (tooltip$.hasClass("tooltip-wide")) {
            U.adjustTextContainerAspectRatio(tooltipElem, 6);
        }
        $(el).on({
            mouseenter: function () {
                game.eunoblades.Director.displayTooltip(tooltipElem);
            },
            mouseleave: function () {
                game.eunoblades.Director.clearTooltip(tooltipID);
            }
        });
    });
}
export { TextPlugin, Flip, MotionPathPlugin, Dragger, 
Observer, CustomEase
 };
export default U.gsap;