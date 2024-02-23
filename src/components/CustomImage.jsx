import Image from "next/image"

export default function CustomImage({
    photo,
    imageProps: { alt, title, sizes, className, onClick },
    wrapperStyle
}) {
    return (
        <div style={{ ...wrapperStyle, position: "relative" }}>
            <Image
                fill
                src={photo}
                loading="lazy"
                placeholder="blur"
                blurDataURL={`data:image/gif;base64,R0lGODlhAQABAPAAAO21BgEA/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`}
                {...{ alt, title, sizes, className, onClick }}
            />
        </div>
    )
}
