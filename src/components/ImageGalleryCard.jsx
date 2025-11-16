import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Image as ImageIcon, X } from "lucide-react"

export function ImageGalleryCard({ title = "Images", images = [] }) {
    const [selectedImage, setSelectedImage] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleImageClick = (image, index) => {
        setSelectedImage({ ...image, index })
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        setSelectedImage(null)
    }

    return (
        <Card className="border-[#268a6461] pt-0">
            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                <CardTitle className="text-lg flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                {images.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                        <ImageIcon className="h-12 w-12 mb-3 opacity-50" />
                        <p className="text-sm">No images available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <Dialog key={index} open={isDialogOpen && selectedImage?.index === index} onOpenChange={(open) => {
                                if (!open && selectedImage?.index === index) {
                                    handleCloseDialog()
                                }
                            }}>
                                <DialogTrigger asChild>
                                    <div
                                        className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-[#268a6461] hover:border-[#268a64] transition-all duration-200 hover:shadow-lg"
                                        onClick={() => handleImageClick(image, index)}
                                    >
                                        <img
                                            src={image}
                                            alt={'lab test image ' + (index + 1)}
                                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200 relative z-0"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                                            <ImageIcon className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                        </div>
                                        {(image.name || image.alt) && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate">
                                                {image.name || image.alt}
                                            </div>
                                        )}
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
                                    <DialogHeader className="p-6 pb-3">
                                        <DialogTitle className="flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <ImageIcon className="h-5 w-5" />
                                                {image.name || image.alt || `Image ${index + 1}`}
                                            </span>
                                            <span className="text-sm font-normal text-gray-500">
                                                {index + 1} of {images.length}
                                            </span>
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="p-6 pt-0">
                                        <div className="relative w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                                            <img
                                                src={image.url || image.src || image}
                                                alt={image.alt || image.name || `Image ${index + 1}`}
                                                className="max-w-full max-h-[70vh] object-contain"
                                            />
                                        </div>
                                        {image.description && (
                                            <p className="mt-4 text-sm text-gray-600">{image.description}</p>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
