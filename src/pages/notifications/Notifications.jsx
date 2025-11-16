import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../providers/AuthContext"
import { getPaginatedNotifications } from "../../providers/ApiProviders"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Bell, CheckCircle, Circle } from "lucide-react"
import { getNotificationBadge } from "../../helpers/getNotificationBadge"
import { markNotificationAsRead } from "../../providers/ApiProviders"
import { formatDate } from "../../helpers/formatDate"
import { useQueryClient } from "@tanstack/react-query"
import NotificationSkeleton from "./components/NotificationSkeleton"

export default function NotificationsPage() {
    const { accessToken } = useAuth();
    const [isReadLoading, setIsReadLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const queryClient = useQueryClient();

    const {
        data: notifications,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["notifications", accessToken, currentPage],
        queryFn: () =>
            getPaginatedNotifications({
                accessToken,
                page: currentPage,
                pageSize,
            }),
        enabled: !!accessToken,
    })

    const handleMarkedAsRead = async (notificationId) => {
        setIsReadLoading(true);
        await markNotificationAsRead({ accessToken, notificationId });
        queryClient.invalidateQueries({
            queryKey: ["notifications", accessToken, currentPage],
        });
        queryClient.invalidateQueries({
            queryKey: ["unreadNotifications", accessToken],
        });
        setIsReadLoading(false);
    }

    if (isLoading) {
        return (
            <NotificationSkeleton />
        )
    }


    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6 text-center">
                        <p className="text-red-800">Failed to load notifications. Please try again.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const totalPages = notifications?.totalPages || Math.ceil((notifications?.totalItems || 0) / pageSize)
    return (
        <div className="container mx-auto px-4 py-4">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-sm text-gray-600">{notifications?.totalItems || 0} total notifications</p>
                    </div>
                </div>

                <div className="space-y-2">
                    {notifications?.data?.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                                <p className="text-sm text-gray-600">You're all caught up! Check back later for new notifications.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        notifications?.data?.map((notification) => (
                            <Card
                                key={notification.id}
                                className={`transition-all hover:shadow-md ${!notification.is_read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
                                    }`}
                            >
                                <CardContent className="p-3">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {getNotificationBadge(notification)}
                                                {notification.is_read ? (
                                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                                ) : (
                                                    <Circle className="w-3 h-3 text-blue-600" />
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-500">{notification.time}</span>
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="text-sm font-semibold text-gray-900 leading-tight">{notification.title}</h3>
                                            <p className="text-xs text-gray-700 leading-relaxed">{notification.message}</p>
                                        </div>

                                        {notification.data && Object.keys(notification.data).length > 0 && (
                                            <div className="bg-gray-50 rounded-lg p-2">
                                                <div className="grid grid-cols-2 gap-1 text-xs">
                                                    {Object.entries(notification.data).map(([key, value]) => (
                                                        <div key={key} className="flex justify-between">
                                                            <span className="text-gray-600 capitalize">{key.replace("_", " ")}:</span>
                                                            <span className="text-gray-900 font-medium">{String(value)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                {formatDate(notification.created_at)}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                {!notification.is_read && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleMarkedAsRead(notification.id)}
                                                        className="text-xs h-6 px-2"
                                                        disabled={isReadLoading}
                                                    >
                                                        Mark as Read
                                                    </Button>
                                                )}
                                                {/* <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleViewDetails(notification)}
                                                    className="text-xs h-6 px-2 text-blue-600 hover:text-blue-700"
                                                >
                                                    <ExternalLink className="w-3 h-3 mr-1" />
                                                    View
                                                </Button> */}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const pageNum = i + 1
                                    return (
                                        <PaginationItem key={pageNum}>
                                            <PaginationLink
                                                onClick={() => setCurrentPage(pageNum)}
                                                isActive={currentPage === pageNum}
                                                className="cursor-pointer"
                                            >
                                                {pageNum}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                })}

                                {totalPages > 5 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    )
}
