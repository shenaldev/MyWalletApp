import { ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type PaymentCardProps = {
  children: ReactNode;
};

function PaymentTotalCarousel({ children }: PaymentCardProps) {
  return (
    <div className="container">
      <Carousel
        opts={{ align: "start" }}
        className="mx-auto max-w-[70dvw] md:max-w-[80dvw] lg:max-w-[90dvw]"
      >
        <CarouselContent>{children}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default PaymentTotalCarousel;
