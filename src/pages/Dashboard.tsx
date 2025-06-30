
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectForm from '@/components/ProjectForm';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  createdAt: Date;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const handleAddProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setProjects(prev => [...prev, newProject]);
    console.log('New project added:', newProject);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-foreground">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        {/* Project Form */}
        <div className="mb-12">
          <ProjectForm onSubmit={handleAddProject} />
        </div>

        {/* Projects List */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Projects ({projects.length})</h2>
          
          {projects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No projects added yet. Use the form above to add your first project!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-card border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{project.description}</p>
                  
                  <div className="mb-3">
                    <strong>Technologies:</strong> {project.technologies}
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-3">
                    Added: {project.createdAt.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
