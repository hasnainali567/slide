import {
  getKeyWordAutomation,
  matchKeyword,
  trackResponses,
} from "@/actions/webhook/queries";
import { sendDm } from "@/lib/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const hub = request.nextUrl.searchParams.get("hub.challenge");
  return new NextResponse(hub);
}

export async function POST(request: NextRequest) {
  const webhook_payload = await request.json();
  let matcher;
  try {
    if (webhook_payload.entry[0].messaging) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text,
      );
    }

    if (webhook_payload.entry[0].changes) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].changes[0].value.text,
      );
    }

    if (matcher && matcher.automationId) {
      if (webhook_payload.entry[0].messaging) {
        const automation = await getKeyWordAutomation(
          matcher.automationId,
          true,
        );
        if (automation && automation.trigger) {
          if (
            automation.listener &&
            automation.listener.listener === "MESSAGE"
          ) {
            const direct_message = await sendDm(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation.listener.prompt,
              automation.User?.integrations[0].token ?? '',
            );

            if (direct_message.status === 200) {
              const tracked = await trackResponses(automation.id, "DM");
              if (tracked) {
                return NextResponse.json(
                  {
                    message: "Message sent",
                  },
                  { status: 200 },
                );
              }
            }
          }

          if (
            automation.listener &&
            automation.listener.listener === "SMARTAI" &&
            automation.User?.subscription?.plan === "PRO"
          ) {
            const smart_ai_message = 'genai'
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
