import Image from "next/image";

type LogoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function Logo({
  src,
  alt,
  width,
  height,
  className,
}: LogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
