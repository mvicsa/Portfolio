"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Search, Eye, MessageSquare, CheckCircle, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ContactMessage {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  ip: string
  createdAt: string
  updatedAt: string
}

interface MessageCounts {
  unread: number
  read: number
  replied: number
  total: number
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [counts, setCounts] = useState<MessageCounts>({ unread: 0, read: 0, replied: 0, total: 0 })
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, pages: 0 })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: statusFilter,
        search: searchTerm
      })

      const response = await fetch(`/api/contact/messages?${params}`)
      const data = await response.json()

      if (response.ok) {
        setMessages(data.messages)
        setCounts(data.counts)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, statusFilter, searchTerm])

  const updateMessageStatus = async (messageId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/contact/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageId, status: newStatus }),
      })

      if (response.ok) {
        // Update local state
        setMessages(prev => prev.map(msg => 
          msg._id === messageId ? { ...msg, status: newStatus as 'unread' | 'read' | 'replied' } : msg
        ))
        
        // Refresh counts
        fetchMessages()
      }
    } catch (error) {
      console.error('Error updating message status:', error)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [pagination.page, statusFilter, searchTerm, fetchMessages])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <Clock className="h-4 w-4 text-orange-500" />
      case 'read':
        return <Eye className="h-4 w-4 text-blue-500" />
      case 'replied':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Mail className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      unread: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      read: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      replied: "bg-green-100 text-green-800 hover:bg-green-200"
    }
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">Manage and respond to contact form submissions</p>
        </div>
        <Button onClick={fetchMessages} disabled={loading}>
          <Mail className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold text-orange-600">{counts.unread}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Read</p>
                <p className="text-2xl font-bold text-blue-600">{counts.read}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Replied</p>
                <p className="text-2xl font-bold text-green-600">{counts.replied}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-gray-600">{counts.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({counts.total})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({counts.unread})</TabsTrigger>
          <TabsTrigger value="read">Read ({counts.read})</TabsTrigger>
          <TabsTrigger value="replied">Replied ({counts.replied})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No messages found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'No contact messages have been submitted yet'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(message.status)}
                            <CardTitle className="text-lg">{message.subject}</CardTitle>
                            {getStatusBadge(message.status)}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>From: {message.name} ({message.email})</span>
                            <span>IP: {message.ip}</span>
                            <span>{formatDate(message.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {message.status === 'unread' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateMessageStatus(message._id, 'read')}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          {message.status === 'read' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateMessageStatus(message._id, 'replied')}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Mark Replied
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject}`)}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">
                        {truncateText(message.message, 300)}
                      </p>
                      {message.message.length > 300 && (
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto mt-2"
                          onClick={() => {
                            // You could implement a modal to show full message
                            alert(message.message)
                          }}
                        >
                          Read full message
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
          >
            Previous
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.pages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.pages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default ContactMessages
