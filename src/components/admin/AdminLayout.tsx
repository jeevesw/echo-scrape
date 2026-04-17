import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, FileText, Home, Wand2, UserCircle, Briefcase, Search } from 'lucide-react';
import logoTwoTone from '@/assets/logo-two-tone.svg';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link to="/admin/blog">
              <img src={logoTwoTone} alt="Trapeze Media" className="h-8" />
            </Link>
            <nav className="flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/blog">
                  <FileText className="h-4 w-4 mr-2" />
                  Blog Posts
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/authors">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Authors
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/case-studies">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Case Studies
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/seo">
                  <Search className="h-4 w-4 mr-2" />
                  SEO Manager
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/blog/migrate">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Migration Tool
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" target="_blank">
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
