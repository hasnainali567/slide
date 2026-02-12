import { findAutomationById } from "@/actions/automations/query";
import {
  createChatHistory,
  getChatHistory,
  getKeyWordAutomation,
  getKeywordPost,
  matchKeyword,
  trackResponses,
} from "@/actions/webhook/queries";
import { sendDm } from "@/lib/fetch";
import ai from "@/lib/gemini";
import { client } from "@/lib/prisma";
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
              automation.User?.integrations[0].token ?? "",
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
            const customer_message =
              webhook_payload.entry[0].messaging[0].message.text;

            const smart_ai_message = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              config: {
                systemInstruction: `You are a helpful assistant for responding to Instagram messages. Always keep responses under 2 sentences. If you don't know the answer to a question, say you don't know. Always be concise and to the point. bussiness owner prompt : ${automation.listener.prompt}`,
                temperature: 0.7,
              },
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `Customer message : "${customer_message}"`,
                    },
                  ],
                },
              ],
            });

            if (smart_ai_message.text) {
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                customer_message,
              );

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.text,
              );

              await client.$transaction([reciever, sender]);

              const direct_message = await sendDm(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.text,
                automation.User?.integrations[0].token ?? "",
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
          }
        }
      }

      if (
        webhook_payload.entry[0].changes &&
        webhook_payload.entry[0].changes[0].field === "comments"
      ) {
        const automation = await getKeyWordAutomation(
          matcher.automationId,
          false,
        );

        const automations_post = await getKeywordPost(
          automation?.id!,
          webhook_payload.entry[0].changes[0].value.media.id,
        );

        if (automation && automations_post && automation.trigger) {
          if (automation.listener) {
            if (automation.listener?.listener === "MESSAGE") {
              const direct_message = await sendDm(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.from.id,
                automation.listener.prompt,
                automation.User?.integrations[0].token ?? "",
              );

              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, "COMMENT");
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
              automation.listener.listener === "SMARTAI" &&
              automation.User?.subscription?.plan === "PRO"
            ) {
              const customer_message =
                webhook_payload.entry[0].changes[0].value.text;

              const smart_ai_message = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                config: {
                  systemInstruction: `You are a helpful assistant for responding to Instagram messages. Always keep responses under 2 sentences. If you don't know the answer to a question, say you don't know. Always be concise and to the point. bussiness owner prompt : ${automation.listener.prompt}`,
                  temperature: 0.7,
                },
                contents: [
                  {
                    role: "user",
                    parts: [
                      {
                        text: `Customer message : "${customer_message}"`,
                      },
                    ],
                  },
                ],
              });

              if (smart_ai_message.text) {
                const reciever = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  customer_message,
                );

                const sender = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.text,
                );

                await client.$transaction([reciever, sender]);

                const direct_message = await sendDm(
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.text,
                  automation.User?.integrations[0].token ?? "",
                );

                if (direct_message.status === 200) {
                  const tracked = await trackResponses(
                    automation.id,
                    "COMMENT",
                  );
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
            }
          }
        }
      }
    }

    if (!matcher) {
      const customer_history = await getChatHistory(
        webhook_payload.entry[0].messaging[0].recipient.id,
        webhook_payload.entry[0].messaging[0].sender.id,
      );

      if (customer_history.length > 0) {
        const automation = await findAutomationById(
          customer_history[0].automationId!,
        );

        if (
          automation?.listener &&
          automation.listener.listener === "SMARTAI" &&
          automation.User?.subscription?.plan === "PRO"
        ) {
          const customer_message =
            webhook_payload.entry[0].messaging[0].message.text;

          const history_for_ai: {
            role: "user" | "model";
            parts: [{ text: string }];
          }[] = [];

          for (const message of customer_history) {
            if (!message.message) continue;

            const isCustomer =
              message.senderId ===
              webhook_payload.entry[0].messaging[0].sender.id;
            const role = isCustomer ? "user" : "model";
            history_for_ai.push({ role, parts: [{ text: message.message }] });
          }

          const smart_ai_message = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
              systemInstruction: `You are a helpful assistant for responding to Instagram messages. Always keep responses under 2 sentences. If you don't know the answer to a question, say you don't know. Always be concise and to the point. bussiness owner prompt : ${automation.listener.prompt}`,
              temperature: 0.7,
            },
            contents: [
              ...history_for_ai,
              {
                role: "user",
                parts: [
                  {
                    text: `Customer message : "${customer_message}"`,
                  },
                ],
              },
            ],
          });

          if (smart_ai_message.text) {
            const reciever = createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              webhook_payload.entry[0].messaging[0].message.text,
            );

            const sender = createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].recipient.id,
              smart_ai_message.text,
            );

            await client.$transaction([reciever, sender]);
            const direct_message = await sendDm(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.text,
              automation.User?.integrations[0].token ?? "",
            )

            if (direct_message.status === 200) {
              return NextResponse.json(
                {
                  message: "Message sent",
                },
                { status: 200 },
              );
            }
          }
        }
      }

      return NextResponse.json(
        {
          message: "No automation set",
        },
        { status: 200 },
      );

    }
    return NextResponse.json(
      {
        message: "No automation set",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "No automation set",
      },
      { status: 200 },
    );  
  }
}
