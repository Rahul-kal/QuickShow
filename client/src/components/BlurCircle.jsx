    const BlurCircle = ({
    top = "auto",
    left = "auto",
    right = "auto",
    bottom = "auto",
    }) => {
    return (
        <div
        className="absolute -z-50 aspect-square rounded-full bg-primary/30 blur-3xl"
        style={{
            top,
            left,
            right,
            bottom,
            width: "14.5rem",  // 58 * 0.25rem = 14.5rem
            height: "14.5rem"
        }}
        />
    );
    };

    export default BlurCircle;
