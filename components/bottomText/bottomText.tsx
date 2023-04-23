import Version from "./version"

export default function BottomText() {
    return (
        <>
            <Version />
            <div className="flex justify-center">
                <div className="lg:2/5 lg:max-w-md self-center bottom-3 absolute">
                    <div className="text-neutral-500 mt-12 text-center text-opacity-20">
                        <p>© 2023 ZWIT@johhnyCooker Wszelkie prawa zastrzeżone.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
