import React from "react";
import { CardContainer, CardBody } from "../animations/TiltEffect";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.5, // Adjust the stagger delay as needed
    },
  },
};

const imageVarient = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function JustForGamers() {
  const features = [
    {
      url: "/public/images/icons/gamer_list_icon01.png",
      title: "VR Development",
      description:
        "See how well critics rating new video game release with 100 players",
    },
    {
      url: "/public/images/icons/gamer_list_icon02.png",
      title: "Design & Strategy",
      description:
        "Village and the subline of her own road, the Line Lane. Pityful a rethoric question",
    },
    {
      url: "/public/images/icons/gamer_list_icon03.png",
      title: "Jungle Pharaoh",
      description:
        "Village and the subline of her own road, the Line Lane. Pityful a rethoric question",
    },
  ];

  return (
    <>
      <div
        className="mt-24 max-w-screen-2xl mx-auto bg-center bg-cover lg:h-[41rem]"
        style={{ backgroundImage: "url('/images/design/just_gamer_bg.webp')" }}
      >
        <div className="flex h-full flex-col relative">
          <div className="hidden lg:flex justify-center ">
            <LazyLoadImage
              src="/images/design/gamers_bg_conve01.webp"
              alt="cove image"
            />
          </div>
          <div className="flex justify-center lg:flex-1 flex-row">
            <nav className=" lg:px-2 lg:absolute inset-0 top-10 flex items-start justify-start ">
              <div className="px-6 pt-4 md:px-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-center lg:text-left mb-3 text-2xl font-bold uppercase tracking-tight text-white md:mb-4 lg:text-3xl">
                    Just For<span className="text-amber-500"> Gamers</span>
                  </h2>
                  <p className="text-center lg:text-left mb-4  max-w-md text-gray-500 md:text-lg">
                    Compete with 100 player on a remote island for winner known
                    issue where certain strategic
                  </p>
                  <LazyLoadImage
                    className="mx-auto lg:mx-0 max-w-xl lg:w-3/5"
                    src="public/images/icons/title_bar03.png"
                    alt="title image"
                  />
                </motion.div>
                <motion.ul
                  variants={ContainerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-12 "
                >
                  {features.map((feature, index) => (
                    <motion.li
                      variants={imageVarient}
                      key={index}
                      className="flex items-center gap-4 px-4 py-3 "
                    >
                      <div className="flex items-center self-center w-24 h-24 border-8 border-gray-700 hover:border-amber-500">
                        <LazyLoadImage
                          className=" py-2 px-6 "
                          src={feature.url}
                          alt="feature image"
                        />
                      </div>
                      <div className="flex flex-1 flex-col items-start justify-center gap-0">
                        <h4 className="w-fit truncate font-bold text-lg text-white">
                          {feature.title}
                        </h4>
                        <p className="mb-4  max-w-sm text-white md:text-lg">
                          {feature.description}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </nav>
            <div>
              <main className="overflow-hidden absolute inset-0  hidden lg:flex items-center justify-center">
                <CardContainer
                  className="inter-var "
                  containerClassName="h-[48rem] w-screen"
                >
                  <CardBody className=" relative group/card  ">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring" }}
                      viewport={{ once: true }}
                    >
                      <LazyLoadImage
                        className="h-[40rem]"
                        src="/images/design/just_gamers_img.webp"
                        alt=""
                      />
                    </motion.div>
                  </CardBody>
                </CardContainer>
              </main>
              <main className="absolute inset-0 left-52 top-48 hidden lg:flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  viewport={{ once: true }}
                >
                  <LazyLoadImage
                    src="/images/design/gamers_circle_line.webp"
                    alt=""
                  />
                </motion.div>
              </main>
              <motion.main
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
                className=" absolute inset-0 left-[25rem] top-[19rem] hidden lg:flex items-center justify-center"
              >
                <LazyLoadImage
                  className="animate-spin"
                  src="/images/design/gamers_circle_shape.webp"
                  alt=""
                />
              </motion.main>

              <aside className="px-14 absolute inset-0 top-20 hidden lg:flex items-start justify-end ">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  viewport={{ once: true }}
                >
                  <LazyLoadImage
                    src="/images/design/just_gamers_chart.webp"
                    alt=""
                  />
                </motion.div>
              </aside>
            </div>
          </div>
          <div className="hidden lg:flex justify-center ">
            <LazyLoadImage src="/images/design/gamers_bg_conve02.webp" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
