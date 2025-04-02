import {
  Container,
  Card,
  Text,
  Pill,
  Group,
  Title,
  Anchor,
} from "@mantine/core";
import { formatDistanceToNow, parseISO } from "date-fns";
import Parser from "rss-parser";

interface FeedItem extends Parser.Item {
  feedTitle?: string;
  feedLink?: string;
}

export default async function Home() {
  const parser = new Parser();

  const feeds = await Promise.all([
    parser.parseURL("https://www.privateequitywire.co.uk/feed/"),
    parser.parseURL("https://peprofessional.com/feed/"),
    parser.parseURL("https://www.altassets.net/feed"),
  ]);

  let feedItems = feeds.reduce<FeedItem[]>((acc, feed) => {
    if (feed.items) {
      const mergedItems = feed.items.map((item) => ({
        ...item,
        feedTitle: feed.title,
        feedLink: feed.link,
      }));
      acc.push(...mergedItems);
    }
    return acc;
  }, []);

  feedItems = feedItems.sort((a, b) => {
    const dateA = a.isoDate ? parseISO(a.isoDate).getTime() : 0;
    const dateB = b.isoDate ? parseISO(b.isoDate).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <Container>
      <Title order={1} mb="md">
        Your feed
      </Title>
      {feedItems.map((item) => (
        <Card key={item.guid} shadow="sm" padding="lg" mb="md" withBorder>
          <Anchor href={item.link} size="lg" fw="bold" mb="xs" target="_blank">
            {item.title}
          </Anchor>
          <Anchor
            size="sm"
            c="dimmed"
            mb="xs"
            target="_blank"
            href={item.feedLink}
          >
            {item.feedTitle}
          </Anchor>
          <Group mb="xs">
            {item.isoDate && (
              <Text size="sm" c="dimmed">
                {formatDistanceToNow(parseISO(item.isoDate))}
              </Text>
            )}
            {item.categories && (
              <Text size="sm">
                {item.categories.map((category) => (
                  <Pill key={category} mr="xs" mb="xs">
                    {category}
                  </Pill>
                ))}
              </Text>
            )}
          </Group>
          {item.contentSnippet && (
            <Text size="xs" mb="xs">
              {item.contentSnippet}
            </Text>
          )}
          {Math.random() > 0.5 && (
            <Card withBorder>
              <Text>
                <Text variant="gradient" fw="bold" component="span">
                  AccessPoint Intelligence
                </Text>
              </Text>
              <Text size="xs" c="dimmed">
                Related to your preferences
              </Text>
              <Anchor>Leveraged Buyout of ABC Corp</Anchor>
              <Group>
                <Anchor>XYZ Capital</Anchor>
                <Anchor>ABC Corp</Anchor>
                <Anchor>Goldman Sachs</Anchor>
                <Anchor>Blackstone</Anchor>
              </Group>
            </Card>
          )}
        </Card>
      ))}
    </Container>
  );
}

export const dynamic = "force-dynamic";
