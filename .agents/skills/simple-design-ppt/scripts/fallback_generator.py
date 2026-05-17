import os
import sys
import argparse
import google.generativeai as genai
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()

def generate_image(prompt, output_path, model_name="gemini-2.5-flash-image"):
    """
    Gemini API를 사용하여 이미지를 생성하고 지정된 경로에 저장합니다.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not found in .env file.")
        sys.exit(1)

    try:
        genai.configure(api_key=api_key)
        
        # 모델 설정 (사용자 요청: gemini-2.5-flash-image)
        # 참고: 실제 API 모델명이 다를 경우를 대비해 유연하게 설계
        model = genai.GenerativeModel(model_name)
        
        print(f"[*] Requesting image from external API: {model_name}")
        print(f"[*] Prompt: {prompt[:50]}...")
        
        # 이미지 생성 요청
        response = model.generate_content(prompt)
        
        # 응답 데이터에서 이미지 추출 및 저장
        if response.parts:
            for part in response.parts:
                if hasattr(part, 'inline_data') and part.inline_data:
                    with open(output_path, 'wb') as f:
                        f.write(part.inline_data.data)
                    print(f"[+] Image saved successfully to: {output_path}")
                    return True
        
        print("[-] Error: No image data found in API response.")
        return False

    except Exception as e:
        print(f"[-] Critical Error during API call: {e}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fallback Image Generator using Gemini API")
    parser.add_argument("--prompt", required=True, help="Prompt for image generation")
    parser.add_argument("--output", required=True, help="Path to save the generated image")
    parser.add_argument("--model", default="gemini-2.5-flash-image", help="Model name to use")
    
    args = parser.parse_args()
    
    success = generate_image(args.prompt, args.output, args.model)
    if not success:
        sys.exit(1)
