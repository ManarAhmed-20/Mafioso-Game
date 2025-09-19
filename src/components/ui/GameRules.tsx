"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StyledButton } from '@/components/ui/StyledButton';
import { DialogueBox } from '@/components/ui/DialogueBox';

interface GameRulesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GameRules({ isOpen, onClose }: GameRulesProps) {
  return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 40 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogueBox className="p-6 leading-relaxed">
                            <h2 className="text-3xl font-bold text-[#8C2B2B] mb-4 text-center">
                                طريقة اللعب
                            </h2>

                            <div className="text-right space-y-4 text-lg text-gray-800">
                                <p className="font-bold text-[#8C2B2B]">المقدمة:</p>
                                <p>
                                    لعبة <span className="font-semibold">"مافيوسو"</span>، كل واحد ليه دور
                                    في الشلة، وفي جريمة حصلت، والمطلوب منكم تكتشفوا
                                    المجرم (أو المجرمين) اللي عملوا الجريمة. الأدلة هتساعدكم
                                    توصلوا للحل.
                                </p>

                                <p className="font-bold text-[#8C2B2B]">مراحل اللعبة:</p>
                                <ol className="list-decimal list-inside space-y-3">
                                    <li>
                                        <span className="font-semibold text-[#8C2B2B]">التسمية:</span> في الأول تختاروا اسم للشلة،
                                        وتحددوا عدد اللاعبين، وتدخلوا أساميهم.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-[#8C2B2B]">توزيع الأدوار:</span> كل لاعب بيستلم كارت،
                                        وعلى الكارت مكتوب دوره. لازم كل واحد يشوف كارتُه لوحده
                                        عشان يفضل متخفي ومحدش يعرف إذا كان مافيوسو ولا لأ.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-[#8C2B2B]">التعريف بالوظايف:</span> كل واحد يعرّف الباقيين
                                        على دوره في اللعبة، بس من غير ما يكشف إذا كان مافيوسو ولا بريء.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-[#8C2B2B]">معرفة الجريمة:</span> في المرحلة دي بتتعرفوا
                                        إيه الجريمة اللي حصلت.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-[#8C2B2B]">النقاش المفتوح:</span> تبدأوا تتناقشوا وتقولوا
                                        أنتم شاكين في مين مبدئياً قبل ما الأدلة تظهر.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-[#8C2B2B]">كشف الأدلة:</span> الأدلة بتظهر واحدة واحدة،
                                        بس خد بالك: الدليل الجديد مش بيبان غير بعد ما
                                        تصوتوا وتخرجوا أكتر واحد شاكّين فيه.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-[#8C2B2B]">التصويت:</span> لازم كلكم تصوتوا وتخرجوا
                                        لاعب واحد كل جولة.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-[#8C2B2B]">نهاية اللعبة:</span>
                                        <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                                            <li>
                                                <span className="font-semibold text-green-700">فوز الأبرياء:</span> لما
                                                يكتشفوا المجرم ويخرجوه (سواء كان واحد أو أكتر).
                                            </li>
                                            <li>
                                                <span className="font-semibold text-red-700">فوز المافيوسو:</span> لو
                                                قدروا يبعدوا الشبهات عن نفسهم لحد ما يفضلوا
                                                هما بس.
                                            </li>
                                        </ul>
                                    </li>
                                </ol>

                                <p className="font-bold text-[#8C2B2B] mt-4">سيناريوهات خاصة:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>
                                        <span className="font-semibold">حالة: لاعب بريء + لاعب مافيوسو بس:</span> لو
                                        وصلنا إن في آخر اللعبة فاضل 2 لاعيبة (واحد بريء +
                                        واحد مافيوسو) وكل واحد صوّت على التاني، هنا اللي
                                        خرجوا قبل كدا هما اللي بيحسموا القرار.
                                    </li>
                                    <li>
                                        <span className="font-semibold">التعادل في التصويت:</span> لو الأصوات اتساوت،
                                        لازم بأي طريقة يتم حسم الموضوع ويتخرج لاعب واحد.
                                    </li>
                                </ul>

                                <p className="font-bold text-[#8C2B2B] mt-4">نصايح:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>خلي بالك من تعابير الوش ولغة الجسد.</li>
                                    <li>ركز في الكلام، ممكن تلاقي تناقض أو قصة مش منطقية.</li>
                                    <li>بالنسبة للمافيوسو: خليك واثق ومكار عشان تبعد الشبهات عن نفسك.</li>
                                </ul>
                            </div>
                            <br />
                             <p>ممكن لو مش فاهم اوي من طريقه الشرح دي تدخل على يوتيوب تشوف اي حلقه من حلقات مافيوسو الي عملتها بيس كيك</p>
                            <div className="flex justify-center">
                                <StyledButton className="mt-8 bg-[#8C2B2B] text-white hover:bg-[#732323]" onClick={onClose}>
                                    فهمت، يلا بينا!
                                </StyledButton>
                            </div>
                        </DialogueBox>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
