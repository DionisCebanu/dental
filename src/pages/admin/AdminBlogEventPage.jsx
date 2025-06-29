import React, { useState, useEffect, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { useToast } from '@/components/ui/use-toast';
    import { PlusCircle, Edit3, Trash2, Save, Newspaper, CalendarDays, Clock, Image as ImageIcon, Tags } from 'lucide-react';
    import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      DialogClose,
    } from "@/components/ui/dialog";

    const AdminBlogEventPage = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      
      const [posts, setPosts] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [currentPost, setCurrentPost] = useState(null); // null for new, object for edit
      
      const initialFormData = {
        id: '', title: '', content: '', imageUrl: '', type: 'blog', tags: '', date: '', time: ''
      };
      const [formData, setFormData] = useState(initialFormData);

      useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('restaurantBlogAndEvents')) || [];
        setPosts(storedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)));
      }, []);

      const handleSaveAllPosts = () => {
        localStorage.setItem('restaurantBlogAndEvents', JSON.stringify(posts));
        toast({ title: t('adminBlogEventSavedAllTitle'), description: t('adminBlogEventSavedAllDesc') });
      };

      const openNewPostModal = () => {
        setCurrentPost(null);
        const newPostId = `post_${Date.now()}`;
        setFormData({ ...initialFormData, id: newPostId, date: new Date().toISOString().split('T')[0] });
        setIsModalOpen(true);
      };

      const openEditPostModal = (post) => {
        setCurrentPost(post);
        setFormData({ ...post, tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '' });
        setIsModalOpen(true);
      };

      const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
      
      const handleFormSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSavePost = () => {
        const postData = { ...formData, tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) };
        
        if (!postData.title || !postData.content || !postData.date) {
            toast({ title: t('errorTitle'), description: t('adminBlogEventValidationError'), variant: 'destructive'});
            return;
        }

        if (currentPost) { // Editing
          setPosts(prevPosts => prevPosts.map(p => p.id === currentPost.id ? postData : p));
        } else { // Adding new
          setPosts(prevPosts => [postData, ...prevPosts].sort((a,b) => new Date(b.date) - new Date(a.date)));
        }
        setIsModalOpen(false);
        toast({ title: currentPost ? t('adminBlogEventUpdatedTitle') : t('adminBlogEventAddedTitle'), description: `${postData.title} ${currentPost ? t('adminBlogEventUpdatedDesc') : t('adminBlogEventAddedDesc')}` });
        handleSaveAllPosts(); // Auto-save after each operation
      };

      const handleDeletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
        toast({ title: t('adminBlogEventDeletedTitle'), description: t('adminBlogEventDeletedDesc', {postId}), variant: "destructive" });
        handleSaveAllPosts(); // Auto-save after each operation
      };
      
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-primary">{t('adminNavBlogEvents', { defaultText: "Manage Blog & Events"})}</h1>
            <div className="flex flex-wrap gap-2">
              <Button onClick={openNewPostModal} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle size={18} className="mr-2" /> {t('adminBlogEventAddPost', { defaultText: "Add New Post/Event"})}
              </Button>
              <Button onClick={handleSaveAllPosts} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save size={18} className="mr-2" /> {t('adminBlogEventSaveAllButton', { defaultText: "Save All Posts"})}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
            <Card key={post.id} className="bg-slate-800 border-slate-700 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-primary truncate">{post.title}</CardTitle>
                <CardDescription className="text-xs text-slate-400 flex items-center gap-x-2 flex-wrap">
                    <span className="flex items-center"><CalendarDays size={14} className="mr-1 text-accent"/> {new Date(post.date).toLocaleDateString()}</span>
                    {post.time && <span className="flex items-center"><Clock size={14} className="mr-1 text-accent"/> {post.time}</span>}
                    <span className={`capitalize px-2 py-0.5 rounded-full text-xs font-semibold ${post.type === 'blog' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                        {t(`postType${post.type.charAt(0).toUpperCase() + post.type.slice(1)}`, { defaultText: post.type })}
                    </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-slate-300 line-clamp-3">{post.content}</p>
                {post.imageUrl && <img  src={post.imageUrl} alt={post.title} className="mt-2 rounded-md max-h-32 w-full object-cover" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />}
                {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 border-t border-slate-700 pt-3 mt-auto">
                <Button variant="outline" size="sm" onClick={() => openEditPostModal(post)} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900">
                    <Edit3 size={16} className="mr-1" /> {t('editButtonText')}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                    <Trash2 size={16} className="mr-1" /> {t('deleteButtonText')}
                </Button>
              </CardFooter>
            </Card>
          ))}
          {posts.length === 0 && (
             <p className="col-span-full text-center text-slate-400 py-10">{t('adminBlogEventNoPosts', {defaultText: "No blog posts or events found. Click 'Add New' to create one."})}</p>
          )}
          </div>


          {isModalOpen && (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="bg-slate-850 border-slate-700 text-slate-100 max-w-lg sm:max-w-xl md:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-primary text-2xl">{currentPost ? t('adminBlogEventEditTitle') : t('adminBlogEventAddTitle')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
                  <input type="hidden" name="id" value={formData.id} />
                  <div>
                    <Label htmlFor="title" className="text-slate-300">{t('adminBlogEventFormTitle')}</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleFormChange} className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <Label htmlFor="content" className="text-slate-300">{t('adminBlogEventFormContent')}</Label>
                    <Textarea id="content" name="content" value={formData.content} onChange={handleFormChange} className="bg-slate-700 border-slate-600 min-h-[150px]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="type" className="text-slate-300">{t('adminBlogEventFormType')}</Label>
                        <Select name="type" value={formData.type} onValueChange={(value) => handleFormSelectChange('type', value)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                            <SelectValue placeholder={t('adminBlogEventFormTypePlaceholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            <SelectItem value="blog">{t('postTypeBlog')}</SelectItem>
                            <SelectItem value="event">{t('postTypeEvent')}</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="date" className="text-slate-300">{t('adminBlogEventFormDate')}</Label>
                        <Input id="date" name="date" type="date" value={formData.date} onChange={handleFormChange} className="bg-slate-700 border-slate-600" />
                    </div>
                  </div>
                  {formData.type === 'event' && (
                    <div>
                      <Label htmlFor="time" className="text-slate-300">{t('adminBlogEventFormTime')}</Label>
                      <Input id="time" name="time" type="time" value={formData.time} onChange={handleFormChange} className="bg-slate-700 border-slate-600" />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="imageUrl" className="text-slate-300">{t('adminBlogEventFormImageUrl')}</Label>
                    <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleFormChange} className="bg-slate-700 border-slate-600" placeholder="https://example.com/image.jpg"/>
                  </div>
                  <div>
                    <Label htmlFor="tags" className="text-slate-300">{t('adminBlogEventFormTags')}</Label>
                    <Input id="tags" name="tags" value={formData.tags} onChange={handleFormChange} className="bg-slate-700 border-slate-600" placeholder={t('adminBlogEventFormTagsPlaceholder')}/>
                    <p className="text-xs text-slate-400 mt-1">{t('adminBlogEventFormTagsHelp')}</p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">{t('cancelButtonText')}</Button></DialogClose>
                  <Button onClick={handleSavePost} className="bg-primary hover:bg-primary/90">{t('saveChangesButtonText')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      );
    };

    export default AdminBlogEventPage;