import { Startup } from '@/interfaces/startup';
import { Tab, Tabs } from '@heroui/react';
import { Link } from '@heroui/react';

const TabsSection = ({ startup }: { startup: Startup | null }) => {
  return (
    <div className="flex-1 overflow-hidden">
      <Tabs aria-label="Startup Tabs" variant="underlined" color="primary">
        <Tab key="overview" title="Overview">
          <div className="space-y-4 overflow-auto pr-2 hide-scrollbar">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Description</h4>
              <p className="text-gray-500 text-sm whitespace-pre-line">{startup?.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Profile Link</h4>
              {startup?.profileLink ? (
                <p className="text-gray-500 text-sm whitespace-pre-line">
                  <Link isExternal showAnchorIcon href={startup?.startupLink}>
                    {startup?.startupLink}
                  </Link>
                </p>
              ) : (
                <p className="text-gray-500 text-sm">No profile link provided.</p>
              )}
            </div>
          </div>
        </Tab>
        <Tab key="media" title="Media">
          <div className="p-4 h-full flex items-center justify-center">
            <p className="text-sm text-gray-500">Not available yet.</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsSection;
